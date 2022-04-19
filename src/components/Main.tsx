import {
  Box,
  Button,
  Flex,
  Spinner,
  Text,
  useBoolean,
  useDisclosure,
} from "@chakra-ui/react";
import { useContext, useEffect, useMemo, useState } from "react";
import { dateTimeProps, TimeContext } from "../contexts/TimeContext";
import { useAuth } from "../hooks/useAuth";
import { InputTime } from "./InputTime";

import { ModalSimulationTimePoints } from "./modals/ModalSimulationTimePoints";
import { dateTimeFormatProps, TableComponent } from "./Table";

import { setDoc, doc, db, getDocs, collection } from "../services/Firebase";
import { Pagination } from "./Pagination";

import { format } from "date-fns";
import pt from "date-fns/locale/pt";

export function Main() {
  const { user } = useAuth();
  const { onOpen, isOpen, onClose } = useDisclosure();

  const OverlayOne = () => (
    <ModalSimulationTimePoints
      data={dateTime}
      isOpen={isOpen}
      onClose={onClose}
    />
  );
  const [overlay, setOverlay] = useState();
  const [loading, setLoading] = useBoolean();
  const { handleCalculateHoursPoint, dateTime } = useContext(TimeContext);
  const [entryOne, setEntryOne] = useState("");
  const [exitOne, setExitOne] = useState("");
  const [entryTwo, setEntryTwo] = useState("");
  const [exitTwo, setExitTwo] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);

  let PageSize = 5;
  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return data?.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, data]);

  const totalMinutes = data.reduce((acc, value) => {
    return acc + value.objTotalTimeWork.totalMinutes;
  }, 0);

  const subtractTotalMinutesVsTotalMinutesDefault =
    totalMinutes - 480 * data.length;

  const isTimeNegativeOrPositive = Math.sign(
    subtractTotalMinutesVsTotalMinutesDefault
  );
  const convertNumber = Math.abs(subtractTotalMinutesVsTotalMinutesDefault);

  const timeHor = String(Math.floor(convertNumber / 60)).padStart(2, "0");
  const timeMinutes = String(convertNumber % 60).padStart(2, "0");

  const timeAdded = data?.filter(
    (item) =>
      new Date(item?.createdAt * 1000).getDate() === new Date().getDate()
  );

  useEffect(() => {
    async function getData() {
      try {
        setLoading.on();
        const queryUser = doc(db, "users", user.id);
        const queryDocs = await getDocs(collection(queryUser, "test_points"));
        const dataMap = queryDocs.docs.map((item) => {
          return {
            ...item.data(),
          };
        });

        setData(dataMap);
      } finally {
        setLoading.off();
      }
    }

    if (user) {
      getData();
    }
  }, [user?.id]);

  async function handleSendValues() {
    try {
      const dataTime = handleCalculateHoursPoint(
        entryOne,
        exitOne,
        entryTwo,
        exitTwo
      );

      setEntryOne("");
      setExitOne("");
      setEntryTwo("");
      setExitTwo("");
      await setDoc(
        doc(db, "users", user.id, "test_points", String(new Date().getTime())),
        {
          idPoints: dateTime.idPoints,
          createdAt: dateTime.createdAt,
          entryOne: dataTime.entryOne,
          exitOne: dataTime.exitOne,
          entryTwo: dataTime.entryTwo,
          exitTwo: dataTime.exitTwo,
          objTotalTimeWork: {
            reminderMinutes: dataTime.objTotalTimeWork.reminderMinutes,
            totalHours: dataTime.objTotalTimeWork.totalHours,
            totalMinutes: dataTime.objTotalTimeWork.totalMinutes,
          },
          stringTotalTime: dataTime.stringTotalTime,
          timeMorning: dataTime.timeMorning,
          timeLunch: dataTime.timeLunch,
          timeAfternoon: dataTime.timeAfternoon,
          timeBonus: {
            valueHoursReminder: dataTime.timeBonus.valueHoursReminder,
            valueMinutesReminder: dataTime.timeBonus.valueMinutesReminder,
            definedStatus: dataTime.timeBonus.definedStatus,
          },
        }
      );

      setData((old) => [
        ...old,
        {
          ...dataTime,
        },
      ]);
    } finally {
    }
  }

  function handleSimulationTimePoints() {
    handleCalculateHoursPoint(entryOne, exitOne, entryTwo, exitTwo);
    onOpen();
  }

  function handleShowInfoTime(item: dateTimeFormatProps) {
    handleCalculateHoursPoint(
      item.entryOne,
      item.exitOne,
      item.entryTwo,
      item.exitTwo
    );
    onOpen();
  }

  return (
    <Box maxWidth="max-content" margin="0 auto">
      <ModalSimulationTimePoints
        data={dateTime}
        isOpen={isOpen}
        onClose={onClose}
      />
      {timeAdded.length > 0 ? (
        <Text color="#fff">Horario adicionado</Text>
      ) : (
        <Text textAlign="center" fontSize="2xl" color="#fff">
          Adicione seus horários
        </Text>
      )}

      <Flex
        maxWidth="container.lg"
        margin="0 auto"
        gap="8px"
        padding="32px"
        alignItems="center"
        justifyContent="center"
      >
        <InputTime
          value={entryOne}
          onChange={(e) => setEntryOne(e.target.value)}
        />
        <InputTime
          value={exitOne}
          onChange={(e) => setExitOne(e.target.value)}
        />
        <InputTime
          value={entryTwo}
          onChange={(e) => setEntryTwo(e.target.value)}
        />
        <InputTime
          value={exitTwo}
          onChange={(e) => setExitTwo(e.target.value)}
        />
        {timeAdded.length === 0 && (
          <Button
            width="full"
            background="#ffd373"
            onClick={handleSendValues}
            disabled={
              entryOne.length === 0 ||
              entryTwo.length === 0 ||
              exitOne.length === 0 ||
              exitTwo.length === 0
            }
            _hover={{
              _disabled: {},
              _active: { background: "#ffd373" },
              opacity: "0.4",
            }}
          >
            Adicionar
          </Button>
        )}
      </Flex>
      <Flex mb="18px" alignItems="center" justifyContent="space-between">
        <Button
          _hover={{ opacity: "0.8" }}
          background="yellowgreen"
          textTransform="uppercase"
          onClick={() => handleSimulationTimePoints()}
        >
          Simular
        </Button>

        <Text color={isTimeNegativeOrPositive ? 'green' : 'red'}>{`${timeHor}:${timeMinutes}`}</Text>
      </Flex>

      {loading && (
        <Flex justifyContent="center">
          <Spinner color="gray" size="xl" />
        </Flex>
      )}

      {!loading && data.length > 0 && (
        <TableComponent
          data={currentTableData}
          handleShowInfoTime={handleShowInfoTime}
        />
      )}

      {!loading && data.length === 0 && <span>Nenhum dado encontrado</span>}

      <Pagination
        currentPage={currentPage}
        totalCount={data.length}
        pageSize={PageSize}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </Box>
  );
}
