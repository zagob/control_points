import { Box, Button, Flex, Text, useDisclosure } from "@chakra-ui/react";
import { useContext, useEffect, useMemo, useState } from "react";
import { TimeContext } from "../contexts/TimeContext";
import { useAuth } from "../hooks/useAuth";
import { InputTime } from "./InputTime";

import { ModalSimulationTimePoints } from "./modals/ModalSimulationTimePoints";
import { TableComponent } from "./Table";

import { setDoc, doc, db, getDocs, collection } from "../services/Firebase";
import { Pagination } from "./Pagination";

export function Main() {
  const { user } = useAuth();
  const { onOpen, isOpen, onClose } = useDisclosure();
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
  }, [currentPage]);

  console.log("data", data);

  const timeAdded = data?.filter(
    (item) => new Date(item?.createdAt?.seconds * 1000).getDate() === 13
  );

  useEffect(() => {
    async function getData() {
      const queryUser = doc(db, "users", user.id);
      const queryDocs = await getDocs(collection(queryUser, "points"));
      const dataMap = queryDocs.docs.map((item) => {
        return {
          ...item.data(),
        };
      });

      setData(dataMap);
    }

    if (user) {
      getData();
    }
  }, [user?.id]);

  async function handleSendValues() {
    const dataTime = handleCalculateHoursPoint(
      entryOne,
      exitOne,
      entryTwo,
      exitTwo
    );

    try {
      await setDoc(
        doc(db, "users", user.id, "points", String(new Date().getTime())),
        {
          createdAt: dataTime.createdAt,
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
          createdAt: {
            seconds: dataTime.createdAt.getTime() / 1000,
            nanoseconds: 0,
          },
        },
      ]);
    } finally {
      console.log("acabou");
    }
  }

  function handleSimulationTimePoints() {
    handleCalculateHoursPoint(entryOne, exitOne, entryTwo, exitTwo);
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
      </Flex>
      <Flex mb="18px">
        <Button
          _hover={{ opacity: "0.8" }}
          background="yellowgreen"
          textTransform="uppercase"
          onClick={() => handleSimulationTimePoints()}
        >
          Simular
        </Button>
      </Flex>

      <TableComponent data={currentTableData} />
      <Pagination
        currentPage={currentPage}
        totalCount={data.length}
        pageSize={PageSize}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </Box>
  );
}
