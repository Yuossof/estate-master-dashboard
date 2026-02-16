import React, { useState, useEffect, useRef } from "react";

import Card from "../../../components/shared/ui/Card";
import Select from "../../../components/shared/ui/Select";
import { ApiError, DEFAULT_API_ERROR } from "../../../lib/error";
import { useNavigate } from "react-router-dom";
import CreateUnitForm from "../../../components/units/CreateUnitForm";
import { getProjectsService } from "../../../services/projects";
import { createUnitService } from "../../../services/units";

const defaultUnitData = {
    project_id: "",
    name: "",
    price: "",
    area: "",
    rooms: "",
    bathrooms: ""
};

const CreateUnitPage = () => {
    const navigate = useNavigate();
    const [unitData, setUnitData] = useState(defaultUnitData);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});
    
    // Project Select States
    const [projectRows, setProjectRows] = useState([]);
    const [hasMoreProjects, setHasMoreProjects] = useState(true);
    const [isFetchProjectLoading, setIsFetchProjectLoading] = useState(false);
    const [projectPage, setProjectPage] = useState(1);
    const [selectedProject, setSelectedProject] = useState({});
    const [searchKeyProjectSelect, setSearchKeyProjectSelect] = useState("");
    const [debouncedSearchKeyProjectSelect, setDebouncedSearchKeyProjectSelect] = useState("");
    const optionBoxRef = useRef(null);

    // Debounce search for projects
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearchKeyProjectSelect(searchKeyProjectSelect);
        }, 350);

        return () => clearTimeout(handler);
    }, [searchKeyProjectSelect]);

    // Reset projects when search changes
    useEffect(() => {
        setProjectPage(1);
        setProjectRows([]);
        setHasMoreProjects(true);
    }, [debouncedSearchKeyProjectSelect]);

    // Fetch projects
    useEffect(() => {
        const getProjects = async () => {
            if (!hasMoreProjects) return;
            try {
                setIsFetchProjectLoading(true);
                const data = await getProjectsService(11, projectPage, debouncedSearchKeyProjectSelect, "");
                console.log(data)
                const items = data.data.items || [];

                if (items.length === 0) {
                    setHasMoreProjects(false);
                }

                if (projectPage >= data.data.pagination.totalPages) {
                    setHasMoreProjects(false);
                }

                setProjectRows(prev => [
                    ...prev,
                    ...items.map(item => ({
                        id: item.id,
                        name: item.name
                    }))
                ]);
            } catch (error) {
                console.log(error);
            } finally {
                setIsFetchProjectLoading(false);
            }
        };

        getProjects();
    }, [projectPage, debouncedSearchKeyProjectSelect]);

    // Load more projects
    const loadMoreProjects = () => {
        if (!hasMoreProjects) return;
        setProjectPage(prev => prev + 1);
    };

    const handleSubmit = async () => {
        try {
            const formdata = new FormData();

            try {
                // await companySchema.validate(companyData, { abortEarly: false });

                formdata.append("project_id", selectedProject.id);
                formdata.append("name", unitData.name);
                formdata.append("price", unitData.price);
                formdata.append("area", unitData.area);
                formdata.append("rooms", unitData.rooms);
                formdata.append("bathrooms", unitData.bathrooms);

                setErrors({});
            } catch (error) {
                if (error.inner) {
                    const newErrors = {};
                    error.inner.forEach((e) => {
                        newErrors[e.path] = e.message;
                    });
                    setErrors(newErrors);
                }
                return;
            }

            setIsLoading(true);
            const data = await createUnitService(formdata);
            if (data.status === "success") {
                navigate("/shop-categories");
            }
            console.log("Response data:", data);
        } catch (error) {
            if (error instanceof ApiError) {
                setErrors(error.errors);
            } else {
                setErrors(DEFAULT_API_ERROR.errors);
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <Card>
                <div className="mb-6">
                    <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Create Unit</h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Add a new unit</p>
                </div>

                {/* Project Select */}
                <div className="flex w-full md:items-center sm:items-end items-center mb-8 md:flex-row flex-col">
                    <div className="flex items-center gap-2 flex-1 md:flex-row flex-col md:w-auto w-full">
                        <div className="w-full">
                            <label
                                htmlFor="projectName"
                                className="px-1 text-sm font-medium text-gray-700 dark:text-gray-200"
                            >
                                Project
                            </label>
                            <Select
                                searchKeySelect={searchKeyProjectSelect}
                                onInputChange={(val) => setSearchKeyProjectSelect(val)}
                                onChange={(val) => setSelectedProject(val)}
                                onEndReached={loadMoreProjects}
                                options={projectRows}
                                value={selectedProject.name}
                                isLoading={isFetchProjectLoading}
                                optionBoxRef={optionBoxRef}
                                noResultMessage={"No result"}
                            />
                            {errors.project_id && (
                                <p className="text-red-500 text-sm mt-1">{errors.project_id}</p>
                            )}
                        </div>
                    </div>
                </div>

                <CreateUnitForm
                    formData={unitData}
                    setFormData={setUnitData}
                    errors={errors}
                    setErrors={setErrors}
                    handleSubmit={handleSubmit}
                    isLoading={isLoading}
                />
            </Card>
        </div>
    );
};

export default CreateUnitPage;