import { useEffect, useRef, useState } from "react";
import { login } from "../../store/authSlice";
import { useDispatch } from "react-redux";
import { useRegisterMutation, useLoginMutation } from "../../store/authApiSlice";
import { useNavigate } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import { FloatLabel } from "primereact/floatlabel";
import { SelectButton } from 'primereact/selectbutton';
import { useAddExperiencesMutation } from "../../store/experienceApiSlice";


export const Register = () => {
    const [apiRegister, result] = useRegisterMutation();
    const [apiLogin] = useLoginMutation();
    const [apiAddExperiences] = useAddExperiencesMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({
        fullname: "",
        username: "",
        password: "",
        role: "jobseeker",
        experience: "",
    });
    const [errors, setErrors] = useState({});
    const usernameRef = useRef();

    const roleItems = [
        { name: "Munkavállaló", value: "jobseeker" },
        { name: "Munkáltató", value: "company" },
    ];
    const roleItemTemplate = option => option.name;

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newErrors = {};
        if (credentials.username === "") {
            newErrors.username = "A felhasználónév kötelező!";
        }
        if (credentials.password === "") {
            newErrors.password = "A jelszó kötelező!";
        }
        if (credentials.fullname === "") {
            newErrors.fullname = "A teljes név kötelező!";
        }
        if (credentials.role !== "jobseeker" && credentials.role !== "company"){
            newErrors.role = "A role megadása kötelező és csak munkavállaló vagy munkáltató lehet!";
        }
        setErrors(newErrors);
        console.log();

        if (Object.values(newErrors).length > 0) {
            return;
        }
        console.log(credentials);


        const response = await apiRegister({
            body: {
                "email": credentials.username,
                "password": credentials.password,
                "fullname": credentials.fullname,
                "role": credentials.role,
            }
        });

        console.log(response);

        if (response.error){
            return;
        }

        // login after successful registration

        const loginResponse = await apiLogin({
            body: {
                "email": credentials.username,
                "password": credentials.password
            }
        });

        console.log(loginResponse);

        if (loginResponse.error && loginResponse.error.status === 401){
            return;
        }

        dispatch(
            login({
                user: loginResponse.data.user,
                token: loginResponse.data.accessToken,
            })
        );

        // add experiences
        if (credentials.role === "jobseeker"){
            const experienceLines = credentials.experience.split("\n");
            const experiences = experienceLines.map(line => line.split(";"));
            const experiencesToAdd = [];
            
            for (const exp of experiences) {
                if (exp.length === 3){
                    experiencesToAdd.push({
                        company: exp[0],
                        title: exp[1],
                        interval: exp[2],
                    });
                }
            }
            console.log(experiencesToAdd);
            const addExpResponse = await apiAddExperiences({
                token: loginResponse.data.accessToken,
                body: [...experiencesToAdd],
            });
            console.log(addExpResponse);
        }


        navigate("/", { replace: true });
    }


    // focus on load
    useEffect(() => {
        usernameRef.current.focus();
    }, []);

    return (
        <form onSubmit={handleSubmit} 
            className="mx-auto my-8 max-w-xs flex flex-col gap-6 items-center"
        >
            {result.isError && <p className="text-red-600">Sikertelen regisztráció!</p>}
            <div className="flex flex-col justify-center">
                <FloatLabel>
                    <InputText value={credentials.username}
                        onChange={(e) => setCredentials({...credentials, username: e.target.value})}
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
                    <InputText value={credentials.fullname}
                        onChange={(e) => setCredentials({...credentials, fullname: e.target.value})}
                        type="text"
                        id="fullname"
                        name="fullname"
                    />
                    <label htmlFor="username">Teljes név</label>
                </FloatLabel>
                {errors.fullname && <span className="text-red-600 ml-2">{errors.fullname}</span>}
            </div>
            
            <div className="flex flex-col justify-center">
                <FloatLabel>
                    <InputText value={credentials.password}
                        onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                        type="password"
                        id="password"
                        name="password"
                    />
                    <label htmlFor="username">Jelszó</label>
                </FloatLabel>
                {errors.password && <span className="ml-2 text-red-600">{errors.password}</span>}
            </div>
            
            <div className="flex flex-col justify-center">
                <h3 className="font-bold text-lg">Típus</h3>
                <SelectButton options={roleItems} 
                    itemTemplate={roleItemTemplate}
                    value={credentials.role}
                    onChange={e => setCredentials({...credentials, role: e.target.value})}
                    optionLabel="role"
                />
                {errors.role && <span className="ml-2 text-red-600">{errors.role}</span>}
            </div>

            {credentials.role === "jobseeker" && 
                <div className="flex flex-col justify-center">
                    <h3 className="font-bold text-lg">Tapasztalat hozzáadása</h3>
                    <textarea name="experiences" id="experiences"
                        className="w-96 min-h-28 max-h-60 text-sm"
                        onChange={e => setCredentials({...credentials, experience: e.target.value})}
                    ></textarea>
                </div>
            }
            <button type="submit" className='p-2 bg-sky-500 text-white rounded-lg max-w-28 hover:bg-sky-700'>Regisztráció</button>
        </form>
    );
}