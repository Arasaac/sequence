import { Box, Stack } from "@mui/material";
import Grid from "@mui/material/Grid";
import PictogramCard from "../PictogramCard/PictogramCard";
import SettingCardLang from "../SettingsCards/SettingCardOptions/lang/SettingCardLang";
import SettingCardBoolean from "../SettingsCards/SettingCardBoolean/SettingCardBoolean";
import SettingCard from "../SettingsCards/SettingCard/SettingCard";
import SettingCardBorder from "../SettingsCards/SettingCardBorder/SettingCardBorder";
import { PictSequence } from "../../types/sequence";
import { useIntl } from "react-intl";
import messages from "./DefaultForm.lang";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useCallback, useEffect, useState } from "react";
import { DefaultSettings } from "../../types/ui";
import { updateDefaultSettingsActionCreator } from "../../app/slice/uiSlice";
import SettingCardFontGroup from "../SettingsCards/SettingCardFontGroup/SettingCardFontGroup";

interface DefaultFormProps {
  submit: boolean;
}

const DefaultForm = ({ submit }: DefaultFormProps) => {
  const intl = useIntl();
  const dispatch = useAppDispatch();

  const {
    defaultSettings: {
      pictApiAra: {
        fitzgerald,
        skin: initialSkin,
        hair: initialHair,
        color: initialColor,
      },
      pictSequence: {
        borderIn: initialBorderIn,
        borderOut: initialBorderOut,
        font: initialFont,
        numbered,
        textPosition: initialTextPosition,
      },
    },
  } = useAppSelector((state) => state.ui);

  const [font, setFont] = useState(initialFont);
  const [textPosition, setTextPosition] = useState(initialTextPosition);
  const [skin, setSkin] = useState(initialSkin);
  const [borderIn, setBorderIn] = useState(initialBorderIn);
  const [borderOut, setBorderOut] = useState(initialBorderOut);
  const [hair, setHair] = useState(initialHair);
  const [color, setColor] = useState(initialColor);

  const pictogramGuide: PictSequence = {
    indexSequence: 0,
    img: {
      searched: {
        word: `${intl.formatMessage(messages.pictGuide)}`,
        bestIdPicts: [],
      },
      selectedId: 6009,
      settings: {
        fitzgerald: "#CC00BB",
        skin: skin,
        hair: hair,
        color: color,
      },
    },
    settings: {
      textPosition: textPosition,
      font: font,
      borderIn: borderIn,
      borderOut: borderOut,
    },
    cross: false,
  };

  interface DivididorProps {
    size?: "xs" | "sm" | "md" | "lg" | "xl" | "unknown";
  }

  const Divididor = ({ size = "unknown" }: DivididorProps): JSX.Element => (
    <Grid item xs={12}>
      <Box
        component="div"
        sx={{
          display: { xs: "block", [size]: "none" },
          backgroundColor: "grey.300",
          height: 2,
        }}
      />
    </Grid>
  );

  const handlerSubmit = useCallback(() => {
    const newDefaultSettings: DefaultSettings = {
      pictApiAra: { fitzgerald, skin, hair, color },
      pictSequence: {
        borderIn,
        borderOut,
        font,
        numbered,
        textPosition,
      },
    };

    dispatch(updateDefaultSettingsActionCreator(newDefaultSettings));

    localStorage.setItem(
      "pictDefaultSettings",
      JSON.stringify(newDefaultSettings)
    );
  }, [
    fitzgerald,
    skin,
    hair,
    borderIn,
    borderOut,
    numbered,
    textPosition,
    dispatch,
    color,
    font,
  ]);

  useEffect(() => {
    !submit && handlerSubmit();
  }, [submit, handlerSubmit]);

  return (
    <form onSubmit={handlerSubmit}>
      <Stack
        display={"flex"}
        direction={{ xs: "column", md: "row" }}
        marginTop={1}
        rowGap={2}
        columnGap={2}
      >
        <Box minWidth={200}>
          <PictogramCard
            pictogram={pictogramGuide}
            view="complete"
            variant="plane"
          />
        </Box>

        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <SettingCardLang setting="languages" />
            </Grid>
            <Grid item xs={4}>
              <SettingCardBoolean setting={"numbered"} state={numbered} />
            </Grid>
            <Grid item xs={4}>
              <SettingCardBoolean
                setting="color"
                state={color}
                setState={setColor}
              />
            </Grid>
            <Divididor />
            <Grid item xs={12}>
              <SettingCard
                setting={"textPosition"}
                state={textPosition}
                setState={setTextPosition}
              />
            </Grid>
            <Divididor />
            <Grid item xs={12}>
              <SettingCardFontGroup state={font} setState={setFont} />
            </Grid>
            <Divididor />
            <Grid item xs={12}>
              <SettingCardBorder
                border="borderOut"
                state={borderOut}
                setState={setBorderOut}
              />
            </Grid>
            <Divididor />
            <Grid item xs={12}>
              <SettingCardBorder
                border="borderIn"
                state={borderIn}
                setState={setBorderIn}
              />
            </Grid>
            <Divididor />
            <Grid item xs={12}>
              {color && (
                <Stack
                  display={"flex"}
                  direction={{ xs: "column", md: "row" }}
                  marginTop={1}
                  rowGap={2}
                  columnGap={6}
                >
                  <SettingCard
                    setting={"skin"}
                    state={skin}
                    setState={setSkin}
                  />
                  <Divididor size="md" />
                  <SettingCard
                    setting={"hair"}
                    state={hair}
                    setState={setHair}
                  />
                </Stack>
              )}
            </Grid>
          </Grid>
        </Box>
      </Stack>
    </form>
  );
};

export default DefaultForm;
