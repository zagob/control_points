import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  FormControl,
  FormLabel,
  IconButton,
  Spinner,
  Text,
  useBoolean,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useContext, useEffect, useMemo, useState } from "react";
import { dateTimeProps, TimeContext } from "../contexts/TimeContext";
import { useAuth } from "../hooks/useAuth";
import { InputTime } from "./InputTime";

import { ModalSimulationTimePoints } from "./modals/ModalSimulationTimePoints";
import { TableComponent } from "./Table";

import { Pagination } from "./Pagination";

import { format } from "date-fns";
import pt from "date-fns/locale/pt";
import { CalendarDatePicker } from "./Calendar";
import { api } from "../services/api";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { formatMonthDateFns } from "../utils/formatDate";

import { useQuery, RefetchOptions } from "react-query";
import { queryClient } from "../services/queryClient";
import { FormInput } from "./FormInput";
import { ModalMessage } from "./modals/ModalMessage";

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
    loadingPoint,
  } = useContext(TimeContext);
  const [entryOne, setEntryOne] = useState("");
  const [exitOne, setExitOne] = useState("");
  const [entryTwo, setEntryTwo] = useState("");
  const [exitTwo, setExitTwo] = useState("");
  const [selected, setSelected] = useState<Date>(new Date());

  const [currentPage, setCurrentPage] = useState(1);

  const OverlayOne = () => (
    <ModalSimulationTimePoints isOpen={isOpen} onClose={onClose} />
  );

  const OverlayTwo = () => <ModalMessage isOpen={isOpen} onClose={onClose} />;

  const [overlay, setOverlay] = useState(<OverlayOne />);
  const { data, isFetching, error } = useQuery(
    ["data", currentPage],
    async () => {
      const response = await api.get(
        `/points/list/${user?.id}?year=2022&month=${monthSelected}`
      );
      setDateTime(response.data);

      console.log("responseee", response.data);
      return response.data;
    },
    {
      staleTime: 1000 * 2,
    }
  );
  console.log("dddddd", data);

  let PageSize = 4;
  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return dateTime?.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, dateTime]);

  const totalMinutes = dateTime?.reduce((acc, value) => {
    return acc + value.totalMinutes;
  }, 0);

  const subtractTotalMinutesVsTotalMinutesDefault =
    totalMinutes - 480 * dateTime?.length;

  const isTimeNegativeOrPositive = Math.sign(
    subtractTotalMinutesVsTotalMinutesDefault
  );

  const convertNumber = Math.abs(subtractTotalMinutesVsTotalMinutesDefault);

  const timeHor = String(Math.floor(convertNumber / 60)).padStart(2, "0");
  const timeMinutes = String(convertNumber % 60).padStart(2, "0");

  const timeAdded =
    dateTime?.filter(
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
  }

  async function handleShowInfoTime(item: dateTimeProps) {
    const response = await api.get(`/points/listOne/${item.id}`);

    setDateTimeObject(response.data);
    onOpen();
  }

  async function handleDeletePoint(id: string) {
    await api.delete(`/points/delete/${id}`);

    setDateTime((old) => old.filter((item) => item.id !== id));
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

  return (
    <>
      <Box maxWidth="max-content" margin="0 auto">
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
          height="360px"
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
          w="container.lg"
          justifyContent="space-between"
          alignItems="center"
        >
          <ButtonGroup size="sm" isAttached variant="solid">
            <IconButton
              size="md"
              disabled={monthSelected === 1}
              aria-label="Add to friends"
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
              aria-label="Add to friends"
              size="md"
              icon={<BsFillArrowRightCircleFill />}
              onClick={handleNextMonth}
            />
          </ButtonGroup>

          {dateTime.length > 0 ? (
            <Text
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

        {!loading && dateTime?.length > 0 && (
          <TableComponent
            data={currentTableData}
            handleShowInfoTime={handleShowInfoTime}
            handleDeletePoint={handleDeletePoint}
          />
        )}

        <Pagination
          currentPage={currentPage}
          totalCount={dateTime?.length}
          pageSize={PageSize}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </Box>
    </>
  );
}
