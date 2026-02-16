/* eslint-disable react/prop-types */
import React, { useEffect, useRef, useState } from 'react'
import { Edit } from 'lucide-react'
import CancelButton from '../CancelButton'
import Select from '../shared/ui/Select'
import { getRolesService } from '../../services/roles'

const EditUserRoleForm = ({ handleSubmit, existingData, setSelectedRole, errors, isLoading }) => {

    const [roleRows, setRoleRows] = useState([]);
    const [hasMoreRoles, setHasMoreRoles] = useState(true);
    const [isFetchRoleLoading, setIsFetchRoleLoading] = useState(false);
    const [rolePage, setRolePage] = useState(1);
    const [searchKeyRoleSelect, setSearchKeyRoleSelect] = useState("");
    const [debouncedSearchKeyRoleSelect, setDebouncedSearchKeyRoleSelect] = useState("");
    const optionBoxRef = useRef(null);

    useEffect(() => {
        const getRoles = async () => {
            if (!hasMoreRoles) return;
            try {
                setIsFetchRoleLoading(true);
                const data = await getRolesService(11, rolePage, debouncedSearchKeyRoleSelect);
                const items = data.data.items || [];

                if (items.length === 0 || rolePage >= data.data.pagination.totalPages) {
                    setHasMoreRoles(false);
                }

                setRoleRows(prev => [
                    ...prev,
                    ...items.map(item => ({
                        id: item.id,
                        name: item.name || "",
                    }))
                ]);
            } catch (error) {
                console.log(error);
            } finally {
                setIsFetchRoleLoading(false);
            }
        };

        getRoles();
    }, [rolePage, debouncedSearchKeyRoleSelect]);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearchKeyRoleSelect(searchKeyRoleSelect);
        }, 350);

        return () => clearTimeout(handler);
    }, [searchKeyRoleSelect]);

    useEffect(() => {
        setRolePage(1);
        setRoleRows([]);
        setHasMoreRoles(true);
    }, [debouncedSearchKeyRoleSelect]);

    const loadMoreRoles = () => {
        if (!hasMoreRoles) return;
        setRolePage(prev => prev + 1);
    };[]

    return (
        <div className='mt-6'>
            <div className='flex flex-col gap-4'>
                <div className='grid md:grid-cols-2 grid-cols-1 gap-4'>

                    {/* Item Key */}
                    <div className="w-full">
                        <label
                            htmlFor="clientName"
                            className="px-1 text-sm font-medium text-gray-700 dark:text-gray-200"
                        >
                            Role
                        </label>
                        <Select
                            searchKeySelect={searchKeyRoleSelect}
                            onInputChange={(val) => setSearchKeyRoleSelect(val)}
                            onChange={(val) => setSelectedRole(val)}
                            onEndReached={loadMoreRoles}
                            options={roleRows}
                            value={existingData?.role}
                            isLoading={isFetchRoleLoading}
                            optionBoxRef={optionBoxRef}
                            noResultMessage={"No result"}
                        />

                    </div>
                    {errors.role && <p className='text-[13px] text-red-500 mt-2 ml-1'>*{errors.role}</p>}

                </div>
            </div>

            {/* Submit Button */}
            <div className='mt-6 flex w-full md:justify-end'>
                <CancelButton />
                <button
                    disabled={isLoading}
                    style={{ opacity: isLoading ? "0.6" : "1" }}
                    type="button"
                    className='btn-primary flex items-center gap-3 justify-center h-9 px-3 rounded-md md:w-auto w-full'
                    onClick={handleSubmit}
                >
                    <span>Update</span>
                    <Edit />
                </button>

            </div>
        </div>
    )
}

export default EditUserRoleForm