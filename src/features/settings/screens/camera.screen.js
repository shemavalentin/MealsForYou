import React, { useRef, useState, useEffect } from "react";
import { Camera } from "expo-camera";
import styled from "styled-components/native";
import { View, TouchableOpacity } from "react-native";
import { Text } from "../../../components/typography/text.component";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

// Styled components
const CameraContainer = styled(View)`
  flex: 1;
`;

const ProfileCamera = styled(Camera)`
  flex: 1;
`;

const CaptureButton = styled(TouchableOpacity)`
  position: absolute;
  bottom: 40px;
  align-self: center;
  background-color: white;
  padding: 15px;
  border-radius: 50px;
  z-index: 1;
`;

export const CameraScreen = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const cameraRef = useRef(null);
  const navigation = useNavigation();

  // Request camera permission
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync({ quality: 0.7 });

      // Save URI to AsyncStorage
      await AsyncStorage.setItem("user-profile-photo", photo.uri);

      // Go back to previous screen
      navigation.goBack();
    }
  };

  if (hasPermission === null) return <View style={{ flex: 1 }} />;
  if (hasPermission === false) return <Text>No access to camera</Text>;

  return (
    <CameraContainer>
      <ProfileCamera
        ref={cameraRef}
        type={Camera.Constants.Type.front}
        ratio="16:9"
      />
      <CaptureButton onPress={takePicture}>
        <Text>📸</Text>
      </CaptureButton>
    </CameraContainer>
  );
};
