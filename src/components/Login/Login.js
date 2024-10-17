import { AspectRatio, Button, Card, Sheet, Stack, Typography } from "@mui/joy";
import logo from "../../assets/logo.jpg";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import PasswordInput from "../common/forms/PasswordInput";
import { useSigninMutation } from "../../services/auth";
import { useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { Form, Formik } from "formik";
import TextInput from "../common/forms/TextInput";
import { object, string } from "yup";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const [signin, { isLoading }] = useSigninMutation();

  return (
    <Sheet
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card size="md">
        <AspectRatio>
          <img src={logo} alt="IMEU logo" />
        </AspectRatio>
        <Typography
          level="h4"
          sx={{
            marginBottom: 2,
            borderBottom: "1px solid",
            paddingBottom: 1,
            borderColor: "gray",
          }}
        >
          Signin
        </Typography>
        <Formik
          initialValues={{
            username: "",
            password: "",
          }}
          validationSchema={object({
            username: string().required("Username is required"),
            password: string().required("Password is required"),
          })}
          onSubmit={async (values) => {
            try {
              await signin(values).unwrap();
              navigate(location.state?.next || "/");
              toast.success("Successfully signed in");
            } catch (err) {
              toast.error(err.message);
            }
          }}
        >
          <Form>
            <TextInput
              id="username"
              label="Username"
              autoComplete="username"
              name="username"
              placeholder="Username"
              startDecorator={<PersonOutlinedIcon />}
              sx={{ padding: 1 }}
            />
            <PasswordInput
              id="current-password"
              containerSx={{ marginTop: 3 }}
              name="password"
              label="Password"
              autoComplete="current-password"
              placeholder="Password"
              startDecorator={<LockOutlinedIcon />}
              sx={{ padding: 1 }}
            />
            <Stack direction="row" sx={{ marginTop: 3 }}>
              <Button variant="plain" color="primary" size="sm">
                Forgot password?
              </Button>
              <Button
                type="submit"
                color="success"
                sx={{ marginLeft: "auto" }}
                loading={isLoading}
                disabled={isLoading}
                loadingPosition="start"
              >
                Signin
              </Button>
            </Stack>
          </Form>
        </Formik>
      </Card>
    </Sheet>
  );
}
