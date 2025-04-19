import React, { useState, useEffect, useRef, useMemo, useContext } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { FontSizes } from "../styles/FontSizes";
import { ThemeContext } from "../styles/Theme.context";



interface Iprops {
  onPress: Function;
  title: string;
  disabled?: boolean;
  style?: any;
  titleStyle?: any;
  rightIcon?: any;
  leftIcon?: any;
  secondary?:boolean;
}
export const Button = (props: Iprops) => {
    const { dark, theme, toggle } = useContext(ThemeContext);
  return (
    <TouchableOpacity
      onPress={() => props.onPress()}
      disabled={props.disabled}
      activeOpacity={0.9}
    >
      <View
        style={[
          {
            backgroundColor: props.secondary? 'transparent' :theme.buttonBackGround,
            width: "100%",
            height: 50,
            borderRadius: 7,
            justifyContent: "space-between",
            alignItems: "center",
            marginVertical: 15,
            alignSelf: "center",
            flexDirection: "row",
            paddingHorizontal: 15,
            borderWidth:2,
            borderColor: theme.buttonBackGround
          },
          props.style,
        ]}
      >
        <View style={{ flex: 1 }}>{props.leftIcon && props.leftIcon}</View>

        <Text
          style={[
            {
              color:props.secondary? theme.buttonBackGround : theme.buttonTitle,
              fontSize: FontSizes.large,
              textAlign: "left",
            },
            props.titleStyle,
          ]}
        >
          {props.title}
        </Text>
        <View style={{ flex: 1 }}>{props.rightIcon && props.rightIcon}</View>
      </View>
    </TouchableOpacity>
  );
};