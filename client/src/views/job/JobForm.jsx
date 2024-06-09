import { useEffect, useState } from "react";
import { useCreateJobMutation, useModifyJobByIdMutation } from "../../store/jobApiSlice";
import { SelectButton } from "primereact/selectbutton";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const JobForm = ({ job }) => {
    const [apiCreateJob, createResult] = useCreateJobMutation();
    const [apiModifyJob, modifyResult] = useModifyJobByIdMutation();
    const navigate = useNavigate();
    const token = useSelector((state) => state.auth.token);

    const [errors, setErrors] = useState({});

    const initialJobData = job ? 
        {
            company: job.company,
            position: job.position,
            description: job.description,
            salaryFrom: job.salaryFrom,
            salaryTo: job.salaryTo,
            type: job.type,
            city: job.city,
            homeOffice: job.homeOffice
        } : 
        {
            company: "",
            position: "",
            description: "",
            salaryFrom: 0,
            salaryTo: 0,
            type: "full-time",
            city: "",
            homeOffice: 0,
        }
    ;

    const [jobData, setJobData] = useState(initialJobData);

    useEffect(() => {
        setJobData(initialJobData);
    }, [job]);

    // job type
    const jobTypeItems = [
        { name: "Full-time", value: "full-time"},
        { name: "Part-time", value: "part-time"},
        { name: "Internship", value: "internship"},
        { name: "Contract", value: "contract"},
    ];
    const jobTypeTemplate = (option) => option.name;
    // home office
    const homeOfficeItems = [
        { name: "Igen", value: 1 },
        { name: "Nem", value: 0 },
    ];
    const homeOfficeTemplate = (option) => option.name;

    const handleInput = (e) => {
        setJobData({...jobData, [e.target.name]: e.target.value});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newErrors = {};
        if (jobData.company === "") {
            newErrors.company = "A cég neve kötelező!";
        }
        if (jobData.position === "") {
            newErrors.position = "A pozíció kötelező!";
        }
        if (jobData.city === "") {
            newErrors.city = "A város kötelező!";
        }
        
        setErrors(newErrors);

        if (Object.values(newErrors).length > 0) {
            return;
        }

        if (!job){
            const createResponse = await apiCreateJob({
                token,
                body: {
                    ...jobData, 
                    homeOffice: jobData.homeOffice === 0 ? false : true,
                    salaryFrom: Number(jobData.salaryFrom),
                    salaryTo: Number(jobData.salaryTo),
                },
            });

            if (createResponse.error) return;
        }
        else {
            const modifyResponse = await apiModifyJob({
                token,
                id: job.id,
                body: {
                    ...jobData, 
                    homeOffice: jobData.homeOffice === 0 ? false : true,
                    salaryFrom: Number(jobData.salaryFrom),
                    salaryTo: Number(jobData.salaryTo),
                },
            });

            if (modifyResponse.error) return;
        }

        navigate("/profile");
    }

    return (
        <form onSubmit={handleSubmit}
            className="mx-auto my-8 max-w-min flex flex-col gap-6 items-center border border-slate-300 rounded-xl p-6"
        >
            <div className="flex flex-col justify-center">
                <FloatLabel>
                    <InputText value={jobData.company}
                        onChange={handleInput}
                        type="text"
                        id="company"
                        name="company"
                    />
                    <label htmlFor="company">Cég neve</label>
                </FloatLabel>
                {errors.company && <span className="text-red-600 ml-2">{errors.company}</span>}
            </div>
            <div className="flex flex-col justify-center">
                <FloatLabel>
                    <InputText value={jobData.position}
                        onChange={handleInput}
                        type="text"
                        id="position"
                        name="position"
                    />
                    <label htmlFor="position">Pozíció</label>
                </FloatLabel>
                {errors.position && <span className="text-red-600 ml-2">{errors.position}</span>}
            </div>
            <div className="flex flex-col justify-center">
                <h3 className="font-bold text-lg">Leírás</h3>
                <textarea name="description" id="description"
                    className=" w-72 min-h-28 max-h-60 text-sm"
                    onChange={handleInput}
                    value={jobData.description}
                ></textarea>
                {errors.description && <span className="text-red-600 ml-2">{errors.description}</span>}
            </div>
            <div className="flex flex-col justify-center">
                <FloatLabel>
                    <InputText value={jobData.salaryFrom}
                        onChange={handleInput}
                        type="number"
                        id="salaryFrom"
                        name="salaryFrom"
                    />
                    <label htmlFor="salaryFrom">Fizetési sáv alja</label>
                </FloatLabel>
                {errors.salaryFrom && <span className="text-red-600 ml-2">{errors.salaryFrom}</span>}
            </div>
            <div className="flex flex-col justify-center">
                <FloatLabel>
                    <InputText value={jobData.salaryTo}
                        onChange={handleInput}
                        type="number"
                        id="salaryTo"
                        name="salaryTo"
                    />
                    <label htmlFor="salaryTo">Fizetési sáv teteje</label>
                </FloatLabel>
                {errors.salaryTo && <span className="text-red-600 ml-2">{errors.salaryTo}</span>}
            </div>
            <div className="flex flex-col justify-center">
                <FloatLabel>
                    <InputText value={jobData.city}
                        onChange={handleInput}
                        type="text"
                        id="city"
                        name="city"
                    />
                    <label htmlFor="city">Település</label>
                </FloatLabel>
                {errors.city && <span className="text-red-600 ml-2">{errors.city}</span>}
            </div>
            <div className="flex flex-col justify-center">
                <h3 className="font-bold text-lg">Foglalkoztatás típusa</h3>
                <SelectButton options={jobTypeItems}
                    value={jobData.type}
                    onChange={handleInput}
                    optionLabel="type"
                    itemTemplate={jobTypeTemplate}
                    name="type"
                />
            </div>
            <div className="flex flex-col justify-center">
                <h3 className="font-bold text-lg">Home office</h3>
                <SelectButton options={homeOfficeItems}
                    value={jobData.homeOffice}
                    onChange={handleInput}
                    optionLabel="homeOffice"
                    itemTemplate={homeOfficeTemplate}
                    name="homeOffice"
                />
            </div>
            <button type="submit" className='p-2 bg-sky-500 text-white rounded-lg hover:bg-sky-700'>
                {job ? "Állás szerkesztése" : "Állás hozzáadása"}
            </button>
            {createResult.isError && <p className="text-red-600">Sikertelen létrehozás!</p>}
            {modifyResult.isError && <p className="text-red-600">Sikertelen módosítás!</p>}
        </form>
    );
}