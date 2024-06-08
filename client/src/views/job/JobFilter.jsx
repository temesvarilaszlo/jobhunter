import { InputText } from "primereact/inputtext";
import { FloatLabel } from "primereact/floatlabel";
import { useState } from "react";
import { Dialog } from 'primereact/dialog';
import { Slider } from "primereact/slider";
import { SelectButton } from 'primereact/selectbutton';

export const JobFilter = ({ filters, setFilters, initialFilters }) => {
    const [localFilters, setLocalFilters] = useState({...filters});
    const [filterModalVisible, setFilterModalVisible] = useState(false);

    // job type
    const jobTypeItems = [
        { name: "Minden", value: ""},
        { name: "Full-time", value: "full-time"},
        { name: "Part-time", value: "part-time"},
        { name: "Internship", value: "internship"},
        { name: "Contract", value: "contract"},
    ];
    const jobTypeTemplate = (option) => option.name;

    // home office
    const homeOfficeItems = [
        { name: "Minden", value: 0 },
        { name: "Igen", value: 1 },
        { name: "Nem", value: 2 },
    ];
    const homeOfficeTemplate = (option) => option.name;

    const modalFooter = (
        <button className=" p-2 bg-slate-200 rounded-lg hover:bg-slate-300"
            onClick={() => setLocalFilters({...initialFilters})}
        >
            Alaphelyzetbe állítás
        </button>
    );

    return (
        <div className="flex flex-row flex-wrap mx-auto my-6 items-center gap-2 justify-center">
            <FloatLabel>
                <InputText id="company" value={localFilters.company} 
                    onChange={(e) => setLocalFilters({...localFilters, company: e.target.value})} 
                />
                <label htmlFor="company">Cég neve</label>
            </FloatLabel>
            <button className=' p-2 bg-sky-500 text-white rounded-lg w-28 hover:bg-sky-700'
                onClick={() => setFilters({...localFilters})}
            >
                Keresés <i className='pi pi-search'></i>
            </button>
            <button className=" p-2 bg-slate-200 rounded-lg w-28 hover:bg-slate-300"
                onClick={() => setFilterModalVisible(true)}
            >
                Szűrők <i className="pi pi-filter"></i>
            </button>
            <Dialog header="Szűrők" visible={filterModalVisible} 
                onHide={() => setFilterModalVisible(false)}
                position="top"
                draggable={false}
                footer={modalFooter}
            >
                <div className="flex flex-row flex-wrap gap-4">
                    <div className="flex flex-col gap-2">
                        <h3 className="font-bold text-lg">Fizetési sáv</h3>
                        <p>{localFilters.salaryFrom} - {localFilters.salaryTo} Ft</p>
                        <Slider range
                            style={{width: '80vw', maxWidth: "400px"}}
                            value={[localFilters.salaryFrom, localFilters.salaryTo]}
                            onChange={(e) => {
                                setLocalFilters({...localFilters, salaryFrom: e.value[0], salaryTo: e.value[1]});
                            }}
                            min={0}
                            max={2500000}
                            step={10000}
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <h3 className="font-bold text-lg">Foglalkoztatás típusa</h3>
                        <SelectButton options={jobTypeItems}
                            value={localFilters.type} 
                            onChange={e => setLocalFilters({...localFilters, type: e.target.value})}
                            optionLabel="type"
                            itemTemplate={jobTypeTemplate}
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <h3 className="font-bold text-lg">Település</h3>
                        <InputText id="city"  
                            value={localFilters.city}
                            onChange={e => setLocalFilters({...localFilters, city: e.target.value})}
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <h3 className="font-bold text-lg">Home office</h3>
                        <SelectButton options={homeOfficeItems} 
                            itemTemplate={homeOfficeTemplate}
                            value={localFilters.homeOffice}
                            onChange={e => setLocalFilters({...localFilters, homeOffice: e.target.value})}
                            optionLabel="homeOffice"
                        />
                    </div>
                </div>
            </Dialog>
        </div>
    );
}