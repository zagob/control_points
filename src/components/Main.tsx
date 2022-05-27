import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  IconButton,
  Spinner,
  Text,
  useBoolean,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useContext, useMemo, useState } from "react";
import { dateTimeProps, TimeContext } from "../contexts/TimeContext";
import { useAuth } from "../hooks/useAuth";

import { ModalSimulationTimePoints } from "./modals/ModalSimulationTimePoints";
import { TableComponent } from "./Table";

import { CalendarDatePicker } from "./Calendar";
import { api } from "../services/api";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { formatMonthDateFns, formatYearDateFns } from "../utils/formatDate";

import { useQuery } from "react-query";
import { queryClient } from "../services/queryClient";
import { FormInput } from "./FormInput";

export function Main() {
  const toast = useToast();
  const { user } = useAuth();
  const { onOpen, isOpen, onClose } = useDisclosure();

  const [loading, setLoading] = useBoolean();
  const {
    dateTime,
    setDateTime,
    setDateTimeObject,
    setMonthSelected,
    monthSelected,
    yearSelected,
    setYearSelected,
  } = useContext(TimeContext);
  const [entryOne, setEntryOne] = useState("");
  const [exitOne, setExitOne] = useState("");
  const [entryTwo, setEntryTwo] = useState("");
  const [exitTwo, setExitTwo] = useState("");
  const [selected, setSelected] = useState<Date>(new Date());

  const [currentPage, setCurrentPage] = useState(1);

  const { data, isFetching, error } = useQuery(
    ["data", currentPage],
    async () => {
      const response = await api.get(
        `/points/list/${user?.id}?year=${yearSelected}&month=${monthSelected}&page=${currentPage}`
      );

      setDateTime(response.data);

      return response.data;
    },
    {
      staleTime: 1000 * 2,
    }
  );

  const totalMinutes = dateTime?.listDateMonth.reduce((acc, value) => {
    return acc + value.totalMinutes;
  }, 0);

  const subtractTotalMinutesVsTotalMinutesDefault =
    totalMinutes - 480 * dateTime?.listDateMonth.length;

  const isTimeNegativeOrPositive = Math.sign(
    subtractTotalMinutesVsTotalMinutesDefault
  );

  const convertNumber = Math.abs(subtractTotalMinutesVsTotalMinutesDefault);

  const timeHor = String(Math.floor(convertNumber / 60)).padStart(2, "0");
  const timeMinutes = String(convertNumber % 60).padStart(2, "0");

  const timeAdded =
    dateTime?.listDateMonth.filter(
      (item) =>
        new Date(item?.selectedDate).getDate() === new Date(selected).getDate()
    ).length > 0;

  async function handleSendValues(isSimulation = false) {
    if (timeAdded) {
      toast({
        title: "data já existente! Tente outra",
        position: "top",
        status: "info",
        isClosable: true,
      });
      return;
    }
    const date = {
      userId: user.id,
      selectedDate: selected,
      entryOne,
      exitOne,
      entryTwo,
      exitTwo,
      isSimulation,
    };
    const response = await api.post("/points/create", date);
    queryClient.refetchQueries();

    if (isSimulation) {
      setDateTimeObject(response.data);
      onOpen();
      return;
    }
    setEntryOne("");
    setExitOne("");
    setEntryTwo("");
    setExitTwo("");

    toast({
      title: "data criada com sucesso!",
      position: "top",
      status: "success",
      isClosable: true,
    });
  }

  async function handleShowInfoTime(item: dateTimeProps) {
    const response = await api.get(`/points/listOne/${item.id}`);

    setDateTimeObject(response.data);
    onOpen();
  }

  async function handleDeletePoint(id: string) {
    await api.delete(`/points/delete/${id}`);

    setDateTime((old) => {
      return {
        ...old,
        listDateMonth: old.listDateMonth.filter((item) => item.id !== id),
      };
    });
  }

  function handleBackMonth() {
    setMonthSelected(monthSelected - 1);
    queryClient.removeQueries();
    queryClient.refetchQueries();
  }

  function handleNextMonth() {
    setMonthSelected(monthSelected + 1);
    queryClient.removeQueries();
    queryClient.refetchQueries();
  }

  function handleBackYear() {
    console.log(yearSelected);
    setYearSelected(yearSelected - 1);
    queryClient.removeQueries();
    queryClient.refetchQueries();
  }

  function handleNextYear() {
    setYearSelected(yearSelected + 1);
    queryClient.removeQueries();
    queryClient.refetchQueries();
  }

  return (
    <>
      <Box maxWidth="max-content" margin="0 auto" paddingBottom="32px">
        <ModalSimulationTimePoints isOpen={isOpen} onClose={onClose} />
        {timeAdded ? (
          <Text color="#fff">Horario adicionado</Text>
        ) : (
          <Text textAlign="center" fontSize="2xl" color="#fff">
            {/* Adicione seus horários */}
          </Text>
        )}
        <Flex
          maxWidth="container.lg"
          margin="0 auto"
          gap="8px"
          padding="32px"
          alignItems="center"
          justifyContent="center"
          // height="360px"
          flexDirection={{ base: "column", lg: "row" }}
        >
          <Box height="360px">
            <CalendarDatePicker
              onSelectedDate={setSelected}
              selectedDate={selected}
            />
          </Box>
          <FormInput
            entryOne={entryOne}
            entryTwo={entryTwo}
            exitOne={exitOne}
            exitTwo={exitTwo}
            setEntryOne={setEntryOne}
            setEntryTwo={setEntryTwo}
            setExitOne={setExitOne}
            setExitTwo={setExitTwo}
            timeAdded={timeAdded}
            handleSendValues={handleSendValues}
          />
        </Flex>

        {loading && (
          <Flex justifyContent="center">
            <Spinner color="gray" size="xl" />
          </Flex>
        )}

        <Flex
          w={{ base: "100%", lg: "container.lg" }}
          justifyContent={{ base: "center", lg: "space-between" }}
          alignItems="center"
          flexDirection={{ base: "column", lg: "row" }}
          gap="10px"
        >
          <ButtonGroup size="sm" isAttached variant="solid">
            <IconButton
              size="md"
              disabled={monthSelected === 1}
              aria-label="back month"
              icon={<BsFillArrowLeftCircleFill />}
              onClick={handleBackMonth}
            />
            <Button
              size="md"
              w="24"
              _hover={{ cursor: "not-allowed" }}
              background="#fff"
            >
              {formatMonthDateFns(monthSelected)}
            </Button>
            <IconButton
              disabled={monthSelected === 12}
              aria-label="next month"
              size="md"
              icon={<BsFillArrowRightCircleFill />}
              onClick={handleNextMonth}
            />
          </ButtonGroup>

          <ButtonGroup size="sm" isAttached variant="solid">
            <IconButton
              size="md"
              aria-label="year month"
              icon={<BsFillArrowLeftCircleFill />}
              onClick={handleBackYear}
            />
            <Button
              size="md"
              w="24"
              _hover={{ cursor: "not-allowed" }}
              background="#fff"
            >
              {yearSelected}
            </Button>
            <IconButton
              aria-label="year month"
              size="md"
              icon={<BsFillArrowRightCircleFill />}
              onClick={handleNextYear}
            />
          </ButtonGroup>

          {dateTime?.listDateMonth.length > 0 ? (
            <Text padding="0 32px"
              color={isTimeNegativeOrPositive === 1 ? "green" : "red"}
            >{`Total de tempo ${
              isTimeNegativeOrPositive === 1 ? "Ganhos" : "Restantes"
            } no mês de ${formatMonthDateFns(
              monthSelected
            )}, ${timeHor} horas e ${timeMinutes} minutos`}</Text>
          ) : (
            <Text color={isTimeNegativeOrPositive === 1 ? "green" : "red"}>
              Não existem horários cadastrados neste mês
            </Text>
          )}
        </Flex>

        {!loading && dateTime?.listDateMonth.length > 0 && (
          <>
            <TableComponent
              handleShowInfoTime={handleShowInfoTime}
              handleDeletePoint={handleDeletePoint}
            />
          </>
        )}
      </Box>
    </>
  );
}
