import { Audio } from "expo-av";
import { useState, useEffect } from "react";
import AudioDict from "./AudioDict";

function PlaySound({ audio }) {
  const [sound, setSound] = useState();

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  async function play() {
    const { sound } = await Audio.Sound.createAsync(AudioDict[1].audio);
    setSound(sound);

    await sound.playAsync();
  }

  useEffect(() => {
    play();
  }, []);

  return;
}

export default PlaySound;
