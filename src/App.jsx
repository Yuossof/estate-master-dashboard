import React, { lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Layout from "./layout/Layout";
import AuthLayout from "./layout/AuthLayout";

import { useAuth } from "./hooks/useAuth";
import { ProtectedRoute } from "./components/ProtectedRoute";


import Dashboard from "./pages/dashboard/index";
import CompaniesPage from "./pages/app/companies/CompaniesPage";
import UsersPage from "./pages/app/users/UsersPage";
import RolesPage from "./pages/app/roles/RolesPage";
import ProjectsPage from "./pages/app/projects/ProjectsPage";
import ContractsPage from "./pages/app/contracts/ContractsPage";
import InvoicesPage from "./pages/app/invoices/InvoicesPage";
import Login from "./pages/auth/login";
import CreateRolePage from "./pages/app/roles/CreateRolePage";

const CreateCompanyPage = lazy(() => import("./pages/app/companies/CreateCompanyPage"));
const EditCompanyPage = lazy(() => import("./pages/app/companies/EditCompanyPage"));
const CreateContractPage = lazy(() => import("./pages/app/contracts/CreateContractPage"));
const CreateCompanyUserPage = lazy(() => import("./pages/app/company-users/CreateCompanyUserPage"));
const CompanyUsersPage = lazy(() => import("./pages/app/company-users/CompanyUsersPage"));
const ServiceCategoriesPage = lazy(() => import("./pages/app/service-categories/ServiceCategoriesPage"));
const CreateServiceCategoryPage = lazy(() => import("./pages/app/service-categories/CreateServiceCategoryPage"));
const EditServiceCategoryPage = lazy(() => import("./pages/app/service-categories/EditServiceCategoryPage"));
const ShopCategoriesPage = lazy(() => import("./pages/app/shop-categories/ShopCategoriesPage"));
const CreateShopCategoryPage = lazy(() => import("./pages/app/shop-categories/CreateShopCategoryPage"));
const EditShopCategoriesPage = lazy(() => import("./pages/app/shop-categories/EditShopCategoriesPage"));
const OptionsPage = lazy(() => import("./pages/app/options/OptionsPage"));
const CreateOptionPage = lazy(() => import("./pages/app/options/CreateOptionPage"));
const EditOptionPage = lazy(() => import("./pages/app/options/EditOptionPage"));
const ThingsTodoCategoriesPage = lazy(() => import("./pages/app/things-todo-categories/ThingsTodoCategoriesPage"));
const CreateThingsTodoCategoriesPage = lazy(() => import("./pages/app/things-todo-categories/CreateThingsTodoCategoriesPage"));
const EditThingsTodoCategoryPage = lazy(() => import("./pages/app/things-todo-categories/EditThingsTodoCategoryPage"));
const AllPointUsersPage = lazy(() => import("./pages/app/point-users/AllPointUsersPage"));
const CreateProjectPage = lazy(() => import("./pages/app/projects/CreateProjectPage"));
const EditProjectPage = lazy(() => import("./pages/app/projects/EditProjectPage"));
const UnitsPage = lazy(() => import("./pages/app/units/UnitsPage"));
const DeviceTokensPage = lazy(() => import("./pages/app/device-tokens/DeviceTokensPage"));
const Error = lazy(() => import("./pages/404"));


function App() {
  const { user, isLoading } = useAuth();

  return (
    <main className="App relative">
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<AuthLayout />}>
          <Route
            path="login"
            element={user && user.id && user.email ? <Navigate to="/dashboard" /> : <Login />}
          />
        </Route>

        {/* Protected routes */}
        <Route path="/*" element={<Layout user={user} isLoading={isLoading} />}>
          <Route
            index
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="companies"
            element={
              <ProtectedRoute>
                <CompaniesPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="companies/create"
            element={
              <ProtectedRoute>
                <CreateCompanyPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="companies/edit"
            element={
              <ProtectedRoute>
                <EditCompanyPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="users"
            element={
              <ProtectedRoute>
                <UsersPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="company-users"
            element={
              <ProtectedRoute>
                <CompanyUsersPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="company-users/create"
            element={
              <ProtectedRoute>
                <CreateCompanyUserPage />
              </ProtectedRoute>
            }
          />


          <Route
            path="service-categories"
            element={
              <ProtectedRoute>
                <ServiceCategoriesPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="service-categories/create"
            element={
              <ProtectedRoute>
                <CreateServiceCategoryPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="service-categories/edit"
            element={
              <ProtectedRoute>
                <EditServiceCategoryPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="shop-categories"
            element={
              <ProtectedRoute>
                <ShopCategoriesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="shop-categories/create"
            element={
              <ProtectedRoute>
                <CreateShopCategoryPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="shop-categories/edit"
            element={
              <ProtectedRoute>
                <EditShopCategoriesPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="options"
            element={
              <ProtectedRoute>
                <OptionsPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="options/create"
            element={
              <ProtectedRoute>
                <CreateOptionPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="options/edit"
            element={
              <ProtectedRoute>
                <EditOptionPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="things-todo-categories"
            element={
              <ProtectedRoute>
                <ThingsTodoCategoriesPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="things-todo-categories/create"
            element={
              <ProtectedRoute>
                <CreateThingsTodoCategoriesPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="things-todo-categories/edit"
            element={
              <ProtectedRoute>
                <EditThingsTodoCategoryPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="points"
            element={
              <ProtectedRoute>
                <AllPointUsersPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="projects"
            element={
              <ProtectedRoute>
                <ProjectsPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="projects/create"
            element={
              <ProtectedRoute>
                <CreateProjectPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="projects/edit"
            element={
              <ProtectedRoute>
                <EditProjectPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="units"
            element={
              <ProtectedRoute>
                <UnitsPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="contracts"
            element={
              <ProtectedRoute>
                <ContractsPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="contracts/create"
            element={
              <ProtectedRoute>
                <CreateContractPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="invoices"
            element={
              <ProtectedRoute>
                <InvoicesPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="device-tokens"
            element={
              <ProtectedRoute>
                <DeviceTokensPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="roles"
            element={
              <ProtectedRoute>
                <RolesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="roles/create"
            element={
              <ProtectedRoute>
                <CreateRolePage />
              </ProtectedRoute>
            }
          />
          {/* 404 fallback */}
          <Route path="*" element={<Navigate to="/404" />} />
        </Route>

        {/* 404 Page */}
        <Route
          path="/404"
          element={
            // <Suspense fallback={<Loading />}>
            <Error />
            // </Suspense>
          }
        />
      </Routes>
    </main>
  );
}

export default App;
