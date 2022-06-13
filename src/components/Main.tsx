import {
  Button,
  ButtonGroup,
  Flex,
  Grid,
  GridItem,
  IconButton,
  Spinner,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import { dateTimeProps, TimeContext } from "../contexts/TimeContext";
import { useAuth } from "../hooks/useAuth";

import { ModalSimulationTimePoints } from "./modals/ModalSimulationTimePoints";
import { ModalDeletePoint } from "./modals/ModalDeletePoint";
import { TableComponent } from "./Table";

import { CalendarDatePicker } from "./Calendar";
import { api } from "../services/api";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { ClipboardText } from "phosphor-react";
import { formatMonthDateFns } from "../utils/formatDate";

import { useQuery } from "react-query";
import { queryClient } from "../services/queryClient";
import { FormInput } from "./FormInput";

export function Main() {
  const toast = useToast();
  const { user } = useAuth();
  const { onOpen, isOpen, onClose } = useDisclosure();

  const {
    dateTime,
    setDateTime,
    setDateTimeObject,
    setMonthSelected,
    monthSelected,
    yearSelected,
    setYearSelected,
  } = useContext(TimeContext);

  const [modal, setModal] = useState("ModalShowInfo");
  const [idTime, setIdTime] = useState(undefined);
  const [entryOne, setEntryOne] = useState("");
  const [exitOne, setExitOne] = useState("");
  const [entryTwo, setEntryTwo] = useState("");
  const [exitTwo, setExitTwo] = useState("");
  const [selected, setSelected] = useState<Date>(new Date());

  const { data, isLoading } = useQuery(
    ["data"],
    async () => {
      const response = await api.get(
        `/points/list/${user?.id}?year=${yearSelected}&month=${monthSelected}`
      );

      setDateTime(response.data);

      return response.data;
    },
    {
      staleTime: 1000 * 2,
    }
  );

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
      selectedDate: selected.toISOString(),
      entryOne,
      exitOne,
      entryTwo,
      exitTwo,
      isSimulation,
    };
    const response = await api.post("/points/create", date);
    queryClient.refetchQueries();

    if (isSimulation) {
      setModal("ModalShowInfo");
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
    setModal("ModalShowInfo");
    const response = await api.get(`/points/listOne/${item.id}`);

    setDateTimeObject(response.data);
    onOpen();
  }

  function handleDeletePoint(id: string) {
    setIdTime(id);
    setModal("ModalDeletePointHour");
    onOpen();
  }

  async function removePoint(id: string) {
    await api.delete(`/points/delete/${id}`);
    onClose();
    setDateTime((old) => old.filter((item) => item.id !== id));
    queryClient.refetchQueries();
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
      {modal === "ModalShowInfo" && (
        <ModalSimulationTimePoints isOpen={isOpen} onClose={onClose} />
      )}
      {modal === "ModalDeletePointHour" && (
        <ModalDeletePoint
          isOpen={isOpen}
          onClose={onClose}
          data={idTime}
          onDeletePoint={removePoint}
        />
      )}

      <Grid templateColumns={{ base: "1fr", lg: "400px 1fr" }} gap={6}>
        <GridItem
          height="100%"
          boxShadow="dark-lg"
          paddingBottom="32px"
        >
          <Flex
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
          >
            <CalendarDatePicker
              onSelectedDate={setSelected}
              selectedDate={selected}
            />
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
              selected={selected}
            />
          </Flex>
        </GridItem>
        <GridItem height="100%">
          <Flex
            justifyContent={{ base: "center", lg: "flex-start" }}
            alignItems="center"
            flexDirection={{ base: "column", lg: "row" }}
            gap="8"
            marginBottom="4"
          >
            <Flex gap="2">
              <ButtonGroup size="sm" isAttached variant="solid">
                <IconButton
                  size="sm"
                  disabled={monthSelected === 1}
                  aria-label="back month"
                  icon={<BsFillArrowLeftCircleFill />}
                  onClick={handleBackMonth}
                />
                <Button
                  size="sm"
                  w="20"
                  _hover={{ cursor: "not-allowed" }}
                  background="#fff"
                >
                  {formatMonthDateFns(monthSelected)}
                </Button>
                <IconButton
                  disabled={monthSelected === 12}
                  aria-label="next month"
                  size="sm"
                  icon={<BsFillArrowRightCircleFill />}
                  onClick={handleNextMonth}
                />
              </ButtonGroup>

              <ButtonGroup size="sm" isAttached variant="solid">
                <IconButton
                  size="sm"
                  aria-label="year month"
                  icon={<BsFillArrowLeftCircleFill />}
                  onClick={handleBackYear}
                />
                <Button
                  size="sm"
                  _hover={{ cursor: "not-allowed" }}
                  background="#fff"
                >
                  {yearSelected}
                </Button>
                <IconButton
                  aria-label="year month"
                  size="sm"
                  icon={<BsFillArrowRightCircleFill />}
                  onClick={handleNextYear}
                />
              </ButtonGroup>
            </Flex>

            {!isLoading && (
              <>
                {dateTime?.length > 0 && (
                  <Text
                    fontSize={{ base: "0.6rem", lg: "0.9rem" }}
                    fontWeight="bold"
                    color={isTimeNegativeOrPositive === 1 ? "green" : "red"}
                  >{`Total de tempo ${
                    isTimeNegativeOrPositive === 1 ? "Ganhos" : "Restantes"
                  } no mês de ${formatMonthDateFns(
                    monthSelected
                  )}, ${timeHor} horas e ${timeMinutes} minutos`}</Text>
                )}
              </>
            )}
          </Flex>
          {isLoading ? (
            <Flex w="100%" h="100%" alignItems="center" justifyContent="center">
              <Spinner size="xl" color="white" />
            </Flex>
          ) : (
            <>
              {data.length > 0 ? (
                <TableComponent
                  handleShowInfoTime={handleShowInfoTime}
                  handleDeletePoint={handleDeletePoint}
                />
              ) : (
                // <Text color="#fff">n tem</Text>
                <Flex
                  w="100%"
                  h="100%"
                  alignItems="center"
                  justifyContent="center"
                  flexDirection="column"
                >
                  <ClipboardText size={100} weight="thin" color="gray" />
                  <Text color="gray">Não existem horarios cadastrados!</Text>
                </Flex>
              )}
            </>
          )}
        </GridItem>
      </Grid>
    </>
  );
}
