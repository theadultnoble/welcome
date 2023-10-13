import { useEffect, useState } from "react";
import { Link, useMatches } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import {
  Alert,
  Box,
  Button,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import confetti from "canvas-confetti";
import copy from "copy-to-clipboard";
import { instructionsTheme } from "./theme";

const WIDTH = 300;

export const steps = [Step0, Step1, Step2, Step3, Step4];

function Instructions({ fullPage, children }) {
  useEffect(() => {
    document.body.style.marginLeft = `${WIDTH}px`;

    return () => {
      document.body.style.marginLeft = "0";
    };
  }, []);

  const [match] = useMatches();
  const step = match.params?.step ? parseInt(match.params.step, 10) : 0;

  let prevPath = null;
  let nextPath = null;

  if (step === 1) {
    prevPath = "/";
  } else if (step > 1) {
    prevPath = `/step/${step - 1}`;
  }

  if (step > 0 && step < steps.length - 1) {
    nextPath = `/step/${step + 1}`;
  }

  return (
    <ThemeProvider theme={instructionsTheme}>
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: fullPage ? "100%" : WIDTH,
        }}
      >
        <Box
          sx={{
            height: "100vh",
            backgroundColor: "#19163E",
            color: "#D5D5E3",
            borderWidth: 0,
            borderRightWidth: fullPage ? "0" : "1px",
            boxSizing: "border-box",
            padding: 2,
            paddingBottom: 6,
            overflow: "auto",
          }}
        >
          {children}
        </Box>
        {prevPath && (
          <Button
            component={Link}
            size="small"
            sx={{
              position: "absolute",
              bottom: 20,
              left: 15,
            }}
            to={prevPath}
          >
            ← Previous
          </Button>
        )}
        {nextPath && (
          <Button
            component={Link}
            size="small"
            sx={{ position: "absolute", bottom: 20, right: 15 }}
            to={nextPath}
          >
            Next →
          </Button>
        )}
      </Box>
    </ThemeProvider>
  );
}

Instructions.defaultProps = {
  fullPage: false,
};

function Step0() {
  const [clicked, setClicked] = useState(false);

  const click = () => {
    setClicked(true);
    confetti({
      particleCount: 150,
      startVelocity: 60,
      spread: 60,
      angle: -90,
      origin: { x: 0.5, y: -0.5 },
      ticks: 110,
      colors: ["#582AB9"],
    });
  };

  return (
    <Instructions fullPage>
      <Container maxWidth="sm">
        <Typography variant="h1" mt={8}>
          Welcome
        </Typography>
        <Typography variant="body1" my={1}>
          This app teaches you how to use MightyMeld.
        </Typography>
        <Typography variant="body1" mt={6} mb={1}>
          1. <strong>Click “Drive”</strong> in the toolbar
        </Typography>
        <Box
          sx={{
            marginLeft: "auto",
            marginRight: "auto",
          }}
          component="img"
          src="/test-drive.gif"
          width="100%"
          alt="Clicking test drive toggle button"
          border={1}
        />
        <Typography variant="body1" mt={4} mb={1}>
          2. <strong>Click</strong> this button.
        </Typography>
        <Box>
          <Button onClick={click}>Click me</Button>
        </Box>
        {clicked && (
          <>
            <Typography variant="body1" mt={4} mb={1}>
              You clicked the button! Feel free to play with Drive, and continue
              when you’re ready.
            </Typography>
            <Box>
              <Button component={Link} to="/step/1">
                Continue →
              </Button>
            </Box>
          </>
        )}
      </Container>
    </Instructions>
  );
}

function Step1() {
  return (
    <Instructions>
      <Typography variant="h5" mb={3}>
        Step 1: Play with the app
      </Typography>
      <Typography variant="body2" my={3}>
        On the right you’ll see a to-do app. Let’s play with it a bit.
      </Typography>
      <Typography variant="body2" my={3}>
        <strong>Your task:</strong> Add a new to-do called “Buy groceries”
      </Typography>
    </Instructions>
  );
}

function Step2() {
  return (
    <Instructions>
      <Typography variant="h5" mb={3}>
        Step 2: Style Changes
      </Typography>
      <Typography variant="body2" mt={3}>
        The spacing above the filter buttons is a little too large. Let’s make
        that smaller.
      </Typography>
      <Typography variant="body2" my={3}>
        <strong>Your task:</strong> Switch to edit mode and select the
        <code>&lt;Box&gt;</code> surrounding the filter. Change <code>pt</code>{" "}
        from <code>10</code> to <code>4</code>.
      </Typography>
      <Alert severity="info">
        If you see <code>&lt;App&gt;</code> instead of <code>&lt;Box&gt;</code>,
        try double-clicking
      </Alert>
      <Box
        component="img"
        src="/selected-filter.png"
        sx={{
          maxWidth: "100%",
          height: "auto",
          marginTop: 4,
          border: 1,
        }}
      />
    </Instructions>
  );
}

function Step3() {
  const code = `if ((filter === "active" && task.done) || (filter === "done" && !task.done)) {\n  return null;\n}`;

  return (
    <Instructions>
      <Typography variant="h5" mb={3}>
        Step 3: Code
      </Typography>
      <Typography variant="body2" my={3}>
        You may have noticed the filter doesn’t do anything. Let’s fix that!
      </Typography>
      <Typography variant="body2" my={3}>
        1. <strong>Copy</strong> this code.{" "}
      </Typography>
      <Box sx={{ position: "relative" }}>
        <TextField
          variant="standard"
          fullWidth
          multiline
          rows={5}
          defaultValue={code}
          sx={{
            backgroundColor: "background.paper",
          }}
          InputProps={{
            disableUnderline: true,
            readOnly: true,
            sx: {
              padding: 1,
              fontFamily: "monospace",
              color: "#000",
              fontSize: 12,
            },
          }}
        />
        <Button
          size="small"
          onClick={() => copy(code)}
          sx={{
            padding: "2px",
            position: "absolute",
            bottom: "5px",
            right: "5px",
          }}
        >
          Copy
        </Button>
      </Box>
      <Typography variant="body2" my={3}>
        2. <strong>Right-click</strong> the <code>&lt;List&gt;</code> to open
        the relevent file in your editor.
      </Typography>
      <Box
        component="img"
        src="/open-in-editor.png"
        border={1}
        sx={{
          maxWidth: "100%",
          height: "auto",
        }}
      />
      <Typography variant="body2" my={3}>
        3. <strong>Paste</strong> the code before the line with{" "}
        <code>const labelId</code>, and <strong>save the file</strong>.
      </Typography>
    </Instructions>
  );
}

function Step4() {
  return (
    <Instructions>
      <Typography variant="h5" mb={3}>
        Step 4: Git Diff
      </Typography>
      <Typography variant="body2" my={3}>
        Let’s see what changes we’ve made so far.
      </Typography>
      <Typography variant="body2" my={3}>
        <strong>Your task:</strong> Click on the diff icon in the toolbar.
      </Typography>
      <Box
        component="img"
        src="/diff.png"
        sx={{ border: 1 }}
        width="212px"
        height="48px"
      />
      <Typography variant="h5" mt={10}>
        That’s it! You’ve completed the tutorial.
      </Typography>
    </Instructions>
  );
}
