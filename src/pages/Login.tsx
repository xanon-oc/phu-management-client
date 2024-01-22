import { Button, Row } from "antd";
import { FieldValues } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { useAppDispatch } from "../redux/hooks";
import { TUser, setUser } from "../redux/features/auth/authSlice";
import { verifyToken } from "../utils/verifyToken";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import BSForm from "../components/form/BSForm";
import BSInput from "../components/form/BSInput";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const defaultValues = {
    id: "A-0001",
    password: "admin123",
  };

  // const { register, handleSubmit } = useForm({
  //   defaultValues: {
  //     id: "A-0001",
  //     password: "admin123",
  //   },
  // });

  const [login, { error }] = useLoginMutation();

  const onSubmit = async (data: FieldValues) => {
    console.log(data);
    const toastId = toast.loading("Logging in");
    try {
      const userInfo = {
        id: data.id,
        password: data.password,
      };
      const res = await login(userInfo).unwrap();
      const user = verifyToken(res.data.accessToken) as TUser;

      dispatch(setUser({ user: { user: user }, token: res.data.accessToken }));
      toast.success(`Welcome to dashboard ${user.userId}`, {
        id: toastId,
        duration: 2000,
      });
      navigate(`/${user.role}/dashboard`);
    } catch (error) {
      toast.error(`Something went wrong - ${error}`, { id: toastId });
    }
  };

  return (
    <Row justify="center" align="middle" style={{ height: "100vh" }}>
      <BSForm onSubmit={onSubmit} defaultValues={defaultValues}>
        <BSInput type="text" name="id" label="ID " />
        <BSInput type="password" name="password" label="PASSWORD " />
        <Button htmlType="submit">Login</Button>
      </BSForm>
    </Row>
  );
};

export default Login;
