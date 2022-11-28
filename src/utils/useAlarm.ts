import useSound from "use-sound";

export const useAlarm = () => {
  const [playAlarm] = useSound("../alarm.mp3");
  return playAlarm;
};
