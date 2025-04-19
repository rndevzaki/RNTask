import React, { useContext, useEffect } from "react";
import { Text, View, TextInput, TouchableOpacity } from "react-native";
import Feather from "react-native-vector-icons/Feather";
import { FontSizes } from "../styles/FontSizes";
import { ThemeContext } from "../styles/Theme.context";

interface Iprops {
  title?: string;
  label?: string;
  value: string;
  onChangeText: Function;
  onSubmitEditing?: Function;
  errorText?: string;
  returnKeyType?: ReturnType;
  placeholder?: string;
  rightIcon?: any;
  onPressRightIcon?: Function;
  secureTextEntry?: boolean;
  style?: any;
  mandatory?: boolean;
  keyboardType?: string;
  editabble?: boolean;
}
export const CustomTextInput = (props: Iprops) => {
    const { dark, theme, toggle } = useContext(ThemeContext);
  return (
    <View
      style={[
        {
          marginTop: 12,
          alignSelf: "center",
          width: "100%",
          justifyContent: "flex-start",
        },
      ]}
    >
      {props.title !== undefined && (
        <Text
          style={{
            fontSize: FontSizes.small,
            padding: 5,
            paddingVertical: 5,
            color: theme.textColor,
            fontWeight: "500",
          }}
        >
          {props.mandatory ? props.title + "*" : props.title}
        </Text>
      )}
      <View
        style={{
          height: 52,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          //borderWidth: 1,
          borderRadius: 8,
          paddingHorizontal: 12,
          backgroundColor:'white'
        }}
      >
        <TextInput
          style={{
            flex: 1,
            backgroundColor: "transparent",
            color:
              props.editabble || props.editabble == undefined
                ? theme.textColor
                : "grey",
          }}
          placeholder={props.placeholder}
          secureTextEntry={props.secureTextEntry}
          value={props.value}
          keyboardType={
            props.keyboardType !== undefined ? props.keyboardType : "default"
          }
          onChangeText={(value) => props.onChangeText(value)}
          editable={props.editabble}
        />
        {props.rightIcon !== undefined && (
          <TouchableOpacity
            onPress={() => props.onPressRightIcon()}
            activeOpacity={0.8}
          >
            <Feather
              name={props.secureTextEntry ? "eye-off" : "eye"}
              color={"grey"}
              size={24}
            />
          </TouchableOpacity>
        )}
      </View>
      {props.errorText !== undefined && props.errorText !== "" && (
        <Text style={{ color: "red", paddingTop: 10, paddingLeft: 10 }}>
          {props.errorText}
        </Text>
      )}
    </View>
  );
};