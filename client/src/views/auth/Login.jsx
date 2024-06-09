import { useEffect, useRef, useState } from "react";
import { login } from "../../store/authSlice";
import { useDispatch } from "react-redux";
import { useLoginMutation } from "../../store/authApiSlice";
import { useNavigate } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import { FloatLabel } from "primereact/floatlabel";

export const Login = () => {
    const usernameRef = useRef();
    const dispatch = useDispatch();
    const [apiLogin, result] = useLoginMutation();

    const [credentials, setCredentials] = useState({
        username: "",
        password: "",
    });
    const navigate = useNavigate();

    const { username, password } = credentials;

    const [errors, setErrors] = useState({});

    const handleInput = (e) => {
        const { name, value } = e.target;
        setCredentials({
            ...credentials,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newErrors = {};
        if (username === "") {
            newErrors.username = "A felhasználónév kötelező!";
        }
        if (password === "") {
            newErrors.password = "A jelszó kötelező!";
        }
        setErrors(newErrors);

        if (Object.values(newErrors).length > 0) {
            return;
        }


        const response = await apiLogin({
            body: {
                "email": credentials.username,
                "password": credentials.password
            }
        });

        if (response.error && response.error.status === 401){
            return;
        }

        dispatch(
            login({
                user: response.data.user,
                token: response.data.accessToken,
            })
        );
        navigate("/", { replace: true });

    };

    // focus on load
    useEffect(() => {
        usernameRef.current.focus();
    }, []);

    return (
        <form onSubmit={handleSubmit} 
            className="mx-auto my-8 max-w-xl flex flex-col gap-6 items-center"
        >
            {result.isError && <p className="text-red-600">A jelszó vagy az email nem megfelelő!</p>}
            <div className="flex flex-col justify-center">
                <FloatLabel>
                    <InputText value={username}
                        onChange={handleInput}
                        ref={usernameRef}
                        type="text"
                        id="username"
                        name="username"
                    />
                    <label htmlFor="username">Felhasználónév</label>
                </FloatLabel>
                {errors.username && <span className="text-red-600 ml-2">{errors.username}</span>}
            </div>
            
            <div className="flex flex-col justify-center">
                <FloatLabel>
                    <InputText value={password}
                        onChange={handleInput}
                        type="password"
                        id="password"
                        name="password"
                    />
                    <label htmlFor="username">Jelszó</label>
                </FloatLabel>
                {errors.password && <span className="ml-2 text-red-600">{errors.password}</span>}
            </div>
            
            <button type="submit" className='p-2 bg-sky-500 text-white rounded-lg max-w-28 hover:bg-sky-700'>Bejelentkezés</button>
        </form>
    );
};
