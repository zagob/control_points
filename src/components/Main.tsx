import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Heading,
  Spinner,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { dateTimeProps, TimeContext } from "../contexts/TimeContext";
import { useAuth } from "../hooks/useAuth";
import { max } from "date-fns";

import { ModalSimulationTimePoints } from "./modals/ModalSimulationTimePoints";
import { ModalDeletePoint } from "./modals/ModalDeletePoint";
import { TableComponent } from "./Table";

import { CalendarDatePicker } from "./Calendar";
import { api } from "../services/api";
import { ClipboardText } from "phosphor-react";
import { formatMonthDateFns } from "../utils/formatDate";

import { useQuery } from "react-query";
import { queryClient } from "../services/queryClient";
import { FormInput } from "./FormInput";
import { ControlChangeDateButton } from "./ControlChangeDateButton";
import { bankBalanceHours } from "../utils/verifyTotalTimeBank";
import { ModalAddBankBalance } from "./modals/ModalAddBankBalance";

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

  const [modal, setModal] = useState("");
  const [idTime, setIdTime] = useState(undefined);
  const [entryOne, setEntryOne] = useState("");
  const [exitOne, setExitOne] = useState("");
  const [entryTwo, setEntryTwo] = useState("");
  const [exitTwo, setExitTwo] = useState("");
  const [selected, setSelected] = useState<Date>(new Date());

  const [balanceBank, setBalanceBank] = useState("00:00");

  const [inputStatusBankBalance, setStatusHourBankBalance] = useState(0);
  const [inputHourBankBalance, setInputHourBankBalance] = useState("00");
  const [inputMinuteBankBalance, setInputMinuteBankBalance] = useState("00");

  const [allBankBalanceUser, setAllBankBalanceUser] = useState([]);

  async function createbBankBalance() {
    const response = await api.post(`/bankBalance/create/${user.id}`, {
      time: `${inputHourBankBalance.padStart(
        2,
        "0"
      )}:${inputMinuteBankBalance.padStart(2, "0")}`,
      verifyMinutesPositiveOrNegative: inputStatusBankBalance,
      date: new Date().toISOString(),
    });

    if (!response) {
      toast({
        title: "Não foi possivel criar saldo de horas no banco",
        position: "top",
        status: "error",
        isClosable: true,
      });
      return;
    }

    setBalanceBank(response.data.time);
    setAllBankBalanceUser((old) => [...old, response.data]);
  }

  useEffect(() => {
    async function getByYearBankBalance() {
      const response = await api.get(
        `/bankBalance/getByYear/${user.id}?year=${yearSelected}`
      );

      if (response.data.length === 0) {
        setAllBankBalanceUser([]);
        setBalanceBank("00:00");
        return;
      }

      setAllBankBalanceUser(response.data);

      const recentTime = max(response.data.map(({ date }) => new Date(date)));
      const objectReturn = response.data.find(
        (item) => item.date === recentTime.toISOString()
      );

      setBalanceBank(objectReturn.time);
      setStatusHourBankBalance(objectReturn.verifyMinutesPositiveOrNegative);
    }

    getByYearBankBalance();
  }, [user, yearSelected]);

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

    const totalMinutes = response.data.totalMinutes;
    const status = response.data.definedStatus;
    const objectBankBalanceHour = bankBalanceHours(
      totalMinutes,
      status,
      balanceBank
    );

    const responseBankBalance = await api.post(
      `/bankBalance/create/${user.id}`,
      objectBankBalanceHour
    );

    setBalanceBank(responseBankBalance.data.time);
    setStatusHourBankBalance(
      responseBankBalance.data.verifyMinutesPositiveOrNegative
    );

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

  function handleOpenModalAddBankBalance() {
    setModal("ModalAddBankBalance");
    onOpen();
  }

  function handleChangeHourBankBalance(value: string) {
    setInputHourBankBalance(value);
  }

  function handleChangeMinuteBankBalance(value: string) {
    setInputMinuteBankBalance(value);
  }

  function handleChangeStatusBankBalance(value: number) {
    setStatusHourBankBalance(value);
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

      {modal === "ModalAddBankBalance" && (
        <ModalAddBankBalance
          isOpen={isOpen}
          onClose={onClose}
          valueHour={inputHourBankBalance}
          valueMinute={inputMinuteBankBalance}
          onChangeValueStatus={handleChangeStatusBankBalance}
          onChangeValueHour={handleChangeHourBankBalance}
          onChangeValueMinute={handleChangeMinuteBankBalance}
          onSendBankBalance={createbBankBalance}
        />
      )}

      <Grid templateColumns={{ base: "1fr", lg: "400px 1fr" }} gap={6}>
        <GridItem height="100%" boxShadow="dark-lg" paddingBottom="32px">
          {/* <button style={{ background: "white" }} onClick={testeBankBalance}>
            asd
          </button> */}
          <Flex
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
          >
            {allBankBalanceUser.length === 0 ? (
              <>
                <Text color="white">Voçê não tem saldo de horas</Text>
                <Flex mb="4" justifyContent="space-evenly" w="100%">
                  <Button
                    onClick={handleOpenModalAddBankBalance}
                    fontSize="sm"
                    bg="green.800"
                    color="white"
                  >
                    Adicionar
                  </Button>
                  <Button fontSize="sm" onClick={createbBankBalance}>
                    Começar zerado
                  </Button>
                </Flex>
              </>
            ) : (
              <Flex alignItems="center" gap="4" mb="2">
                <Heading fontSize="md" color="white">
                  Saldo Horas Banco:{" "}
                </Heading>
                <Text
                  borderRadius="4"
                  padding="0 4px"
                  color={
                    inputStatusBankBalance === 1
                      ? "green"
                      : inputStatusBankBalance === 0
                      ? "gray"
                      : "red"
                  }
                >
                  {balanceBank}
                </Text>
              </Flex>
            )}

            <Box
              border="1px solid"
              borderColor={selected && "green.700"}
              borderRadius="2xl"
            >
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
            <ControlChangeDateButton
              disabledEndMonth={monthSelected === 1}
              disabledFirstMonth={monthSelected === 12}
              monthSelected={monthSelected}
              yearSelected={yearSelected}
              onHandleBackMonth={handleBackMonth}
              onHandleNextMonth={handleNextMonth}
              onHandleBackYear={handleBackYear}
              onHandleNextYear={handleNextYear}
            />

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
