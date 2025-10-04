// // src/components/ProtectedRoute.jsx
// import { Navigate } from "react-router-dom";
// import { useAuth } from "../Context/AuthContext";
// import { LoaderOne } from "@/components/ui/loader";

// const ProtectedRoute = ({ children }) => {
//   const { isLoggedIn, isLoading } = useAuth();

//   if (isLoading) {
//     return (
//       <div className="flex h-screen w-full justify-center items-center">
//         <LoaderOne />
//       </div>
//     );
//   }

//   if (!isLoggedIn) {
//     return <Navigate to="/login" replace />;
//   }

//   return children;
// };

// export default ProtectedRoute;

import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { LoaderOne } from "@/components/ui/loader";

const ProtectedRoute = ({ children, requiredRole }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex h-screen w-full justify-center items-center">
        <LoaderOne />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole) {
    if (Array.isArray(requiredRole)) {
      // Check if user.role is in allowed roles
      if (
        !requiredRole
          .map((r) => r.toLowerCase())
          .includes(user.role.toLowerCase())
      ) {
        return <Navigate to="/not-authorized" replace />;
      }
    } else if (typeof requiredRole === "string") {
      // Single role
      if (user.role.toLowerCase() !== requiredRole.toLowerCase()) {
        return <Navigate to="/not-authorized" replace />;
      }
    }
  }

  return children;
};

export default ProtectedRoute;
