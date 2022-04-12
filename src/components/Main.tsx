import { Box, Button, Flex, Text, useDisclosure } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { TimeContext } from "../contexts/TimeContext";
import { useAuth } from "../hooks/useAuth";
import { InputTime } from "./InputTime";

import { ModalSimulationTimePoints } from "./modals/ModalSimulationTimePoints";
import { TableComponent } from "./Table";

import { setDoc, doc, db, getDocs, collection } from "../services/Firebase";

export function Main() {
  const { user } = useAuth();
  const { onOpen, isOpen, onClose } = useDisclosure();
  const { handleCalculateHoursPoint, dateTime } = useContext(TimeContext);
  const [entryOne, setEntryOne] = useState("");
  const [exitOne, setExitOne] = useState("");
  const [entryTwo, setEntryTwo] = useState("");
  const [exitTwo, setExitTwo] = useState("");

  const [data, setData] = useState([]);

  const timeAdded = data?.filter(
    (item) => new Date(item?.createdAt?.seconds * 1000).getDate() === 11
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
    handleCalculateHoursPoint(entryOne, exitOne, entryTwo, exitTwo);
    try {
      await setDoc(
        doc(db, "users", user.id, "points", String(new Date().getTime())),
        {
          createdAt: dateTime.createdAt,
          entryOne: dateTime.entryOne,
          exitOne: dateTime.exitOne,
          entryTwo: dateTime.entryTwo,
          exitTwo: dateTime.exitTwo,
          objTotalTimeWork: {
            reminderMinutes: dateTime.objTotalTimeWork.reminderMinutes,
            totalHours: dateTime.objTotalTimeWork.totalHours,
            totalMinutes: dateTime.objTotalTimeWork.totalMinutes,
          },
          stringTotalTime: dateTime.stringTotalTime,
          timeMorning: dateTime.timeMorning,
          timeLunch: dateTime.timeLunch,
          timeAfternoon: dateTime.timeAfternoon,
        }
      );
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

      <TableComponent data={data} />
      <Flex padding="12px 0">
        <Button onClick={() => handleSimulationTimePoints()}>Simular</Button>
      </Flex>
    </Box>
  );
}
