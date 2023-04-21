import { useState } from "react";
import { useAppSelector } from "../../app/hooks";
import BarNavigation from "../../components/BarNavigation/BarNavigation";
import ViewSequencesSettings from "../../components/ViewSequencesSettings/ViewSequencesSettings";
import { ViewSettings } from "../../types/ui";
import PictEditModal from "../../Modals/PictEditModal/PictEditModal";

const SequenceLgPages = (): JSX.Element => {
  const {
    sequence,
    ui: { viewSettings },
  } = useAppSelector((state) => state);

  const initialViewState: ViewSettings = {
    sizePict: viewSettings.sizePict,
    columnGap: viewSettings.columnGap,
    rowGap: viewSettings.rowGap,
  };
  const [view, setView] = useState(initialViewState);

  return (
    <BarNavigation>
      <ViewSequencesSettings view={view} setView={setView}>
        {sequence.map((pictogram) => (
          <PictEditModal pictogram={pictogram} size={view.sizePict} />
        ))}
      </ViewSequencesSettings>
    </BarNavigation>
  );
};

export default SequenceLgPages;
