import {
  createPresenceComponent,
  Field,
  makeStyles,
  mergeClasses,
  type MotionImperativeRef,
  motionTokens,
  Slider,
  Switch,
  tokens,
} from '@fluentui/react-components';
import * as React from 'react';

import description from './PresenceUnmountOnExit.stories.md';

const useClasses = makeStyles({
  container: {
    display: 'grid',
    gridTemplate: `"card card" "controls ." / 1fr 1fr`,
    gap: '20px 10px',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'end',
    gridArea: 'card',

    border: `${tokens.strokeWidthThicker} solid ${tokens.colorNeutralForeground3}`,
    borderRadius: tokens.borderRadiusMedium,
    boxShadow: tokens.shadow16,
    padding: '10px',
  },
  controls: {
    display: 'flex',
    flexDirection: 'column',
    gridArea: 'controls',

    border: `${tokens.strokeWidthThicker} solid ${tokens.colorNeutralForeground3}`,
    borderRadius: tokens.borderRadiusMedium,
    boxShadow: tokens.shadow16,
    padding: '10px',
  },
  field: {
    flex: 1,
  },
  sliderField: {
    gridTemplateColumns: 'min-content 1fr',
  },
  sliderLabel: {
    textWrap: 'nowrap',
  },

  item: {
    backgroundColor: tokens.colorBrandBackground,
    border: `${tokens.strokeWidthThicker} solid ${tokens.colorTransparentStroke}`,
    borderRadius: '50%',

    width: '100px',
    height: '100px',
  },
});

const Fade = createPresenceComponent({
  enter: {
    keyframes: [{ opacity: 0 }, { opacity: 1 }],
    duration: motionTokens.durationSlow,
  },
  exit: {
    keyframes: [{ opacity: 1 }, { opacity: 0 }],
    duration: motionTokens.durationSlow,
  },
});

export const PresenceUnmountOnExit = () => {
  const classes = useClasses();
  const motionRef = React.useRef<MotionImperativeRef>();

  const [playbackRate, setPlaybackRate] = React.useState<number>(30);
  const [visible, setVisible] = React.useState<boolean>(true);
  const [unmountOnExit, setUnmountOnExit] = React.useState<boolean>(true);

  // Heads up!
  // This is optional and is intended solely to slow down the animations, making motions more visible in the examples.
  React.useEffect(() => {
    motionRef.current?.setPlaybackRate(playbackRate / 100);
  }, [playbackRate, visible]);

  return (
    <div className={classes.container}>
      <div className={classes.card}>
        <Fade imperativeRef={motionRef} visible={visible} unmountOnExit={unmountOnExit}>
          <div className={classes.item} />
        </Fade>
      </div>

      <div className={classes.controls}>
        <Field className={classes.field}>
          <Switch
            label={<code>unmountOnExit</code>}
            checked={unmountOnExit}
            onChange={() => setUnmountOnExit(v => !v)}
          />
        </Field>
        <Field className={classes.field}>
          <Switch label="Visible" checked={visible} onChange={() => setVisible(v => !v)} />
        </Field>
        <Field
          className={mergeClasses(classes.field, classes.sliderField)}
          label={{
            children: (
              <>
                <code>playbackRate</code>: {playbackRate}%
              </>
            ),
            className: classes.sliderLabel,
          }}
          orientation="horizontal"
        >
          <Slider
            aria-valuetext={`Value is ${playbackRate}%`}
            className={mergeClasses(classes.field, classes.sliderField)}
            value={playbackRate}
            onChange={(ev, data) => setPlaybackRate(data.value)}
            min={0}
            max={100}
            step={5}
          />
        </Field>
      </div>
    </div>
  );
};

PresenceUnmountOnExit.parameters = {
  docs: {
    description: {
      story: description,
    },
  },
};
