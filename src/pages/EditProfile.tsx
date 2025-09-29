// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Button } from "@/components/ui/button";
// import { useEffect, useState } from "react";
// import { useForm, Controller } from "react-hook-form";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { LoaderOne } from "@/components/ui/loader";
// import { useNavigate } from "react-router-dom";

// type UserProfile = {
//   full_name: string;
//   user_name: string;
//   bio: string;
//   age: number;
//   country: string;
//   gender: string;
//   mobile: string;
//   profile_picture: File | string;
//   slug: string;
//   user: any;
//   // email: string;
// };

// export default function EditProfileForm() {
//   const {
//     register,
//     handleSubmit,
//     reset,
//     control,
//     setValue,
//     formState: { errors, isSubmitting },
//   } = useForm<UserProfile>();

//   const navigate = useNavigate();

//   const [profileData, setProfileData] = useState<any[]>([]);
//   const [previewUrl, setPreviewUrl] = useState<string | null>(null);
//   const [id, setid] = useState(0);

//   useEffect(() => {
    
//     getUserData();
//   }, [reset]);

//   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (file) {
//       setValue("profile_picture", file);
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setPreviewUrl(reader.result as string);
//       };
//       reader.readAsDataURL(file);
//     } else {
//       setPreviewUrl(null);
//     }
//   };

//   const editUserData = async (data: UserProfile) => {
//     const formData = new FormData();
//     formData.append("full_name", data.full_name);
//     formData.append("user_name", data.user_name);
//     formData.append("bio", data.bio);
//     formData.append("age", data.age.toString());
//     formData.append("country", data.country);
//     formData.append("gender", data.gender);
//     formData.append("mobile", data.mobile);
//     // formData.append("email", data.email);
//     if (data.profile_picture instanceof File) {
//       formData.append("profile_picture", data.profile_picture);
//     }

//     try {
//       const response = await fetch(
//         `http://localhost:8000/api/accounts/profiles/`,
//         {
//           method: "PUT",
//           body: formData,
//         }
//       );
//       const result = await response.json();
//       if (!response.ok) {
//         console.log("response error : ", result);
//       }

//       const navigationState = Array.isArray(result) ? result : [result];
//       navigate("/dashboard/profile", { state: navigationState });
//     } catch (error) {
//       console.error("Failed to update profile:", error.status);
//     }
//   };
//   console.log(profileData)

//   if (profileData.length === 0) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <LoaderOne />
//       </div>
//     );
//   }

//   return (
//     <form
//       onSubmit={handleSubmit(editUserData)}
//       className=" w-[90vw] sm:max-w-[450px] md:max-w-[600px] mx-auto bg-gradient-to-br from-orange-200 to-white p-6 border rounded-lg shadow-md space-y-4"
//     >
//       <h2 className="text-xl font-bold">Edit Profile</h2>

//       <div>
//         <label className="block mb-1">Full Name</label>
//         <Input
//           {...register("full_name", { required: "Full name is required" })}
//           className="w-full border p-2 rounded"
//         />
//         {errors.full_name && (
//           <p className="text-red-500">{errors.full_name.message}</p>
//         )}
//       </div>

//       <div>
//         <label className="block mb-1">Bio</label>
//         <Textarea {...register("bio")} className="w-full border p-2 rounded" />
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//         <div>
//           <label className="block mb-1">Age</label>
//           <Input
//             type="number"
//             {...register("age", { valueAsNumber: true })}
//             className="w-full border p-2 rounded"
//           />
//         </div>

//         <div>
//           <label className="block mb-1">Country</label>
//           <Input
//             {...register("country")}
//             className="w-full border p-2 rounded"
//           />
//         </div>

//         <div>
//           <label className="block mb-1">Gender</label>

//           <Controller
//             name="gender"
//             control={control}
//             render={({ field }) => (
//               <Select value={field.value} onValuechange={field.onChange}>
//                 <SelectTrigger className="cursor-pointer">
//                   <SelectValue placeholder="Select Gender" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   {["male", "female"].map((gender) => (
//                     <SelectItem
//                       key={gender}
//                       value={gender}
//                       className="cursor-pointer"
//                     >
//                       {gender.charAt(0).toUpperCase() + gender.slice(1)}
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//             )}
//           />
//         </div>
//       </div>

//       <div>
//         <label className="block mb-1">Mobile</label>
//         <Input {...register("mobile")} className="w-full border p-2 rounded" />
//       </div>

//       <div className="flex items-center justify-center">
//         <Button
//           type="submit"
//           disabled={isSubmitting}
//           className="outline-none p-2 px-16 rounded-md text-white font-semibold my-3 cursor-pointer flex items-center justify-center hover:scale-100 text-lg"
//         >
//           {isSubmitting ? <LoaderOne /> : "Submit"}
//         </Button>
//       </div>
//     </form>
//   );
// }




import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LoaderOne } from "@/components/ui/loader";
import { useNavigate } from "react-router-dom";

type UserProfile = {
  full_name: string;
  bio: string;
  age: number;
  country: string;
  gender: string;
  mobile: string;
  profile_picture: string;
  slug: string;
  user: any;
};

export default function EditProfileForm() {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<UserProfile>();

  
 
  const navigate = useNavigate();

  const [userData, setuserData] = useState<any>([]);
  const [profileData, setprofileData] = useState<any>([])

  const getUserData = async () => {
    const response = await fetch(
      "http://localhost:8000/api/accounts/profiles/"
    );
    const result = await response.json();
    setprofileData(result)
    reset(result)
    console.log(result);
  };

  const editUserData = async (data) => {
    // const response = await fetch(
    //   "http://localhost:8000/api/accounts/profiles/",
    //   {
    //     method: "POST",
    //     body: JSON.stringify(data),
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   }
    // );
    // const result = await response.json();
    // setuserData(result);
    // navigate("/dashboard/profile", { state: userData });
    // console.log(result);
  };

  // Submit function
  // const onSubmit = (data: UserProfile) => {
  //   console.log("Updated Data:", data);
  //   navigate("/dashboard/profile", { state: userData });

  //   // here you can call API -> fetch/axios/RTK query
  //   // fetch("http://localhost:8000/api/profile/1/", {
  //   //   method: "PUT",
  //   //   headers: { "Content-Type": "application/json" },
  //   //   body: JSON.stringify(data),
  //   // })
  // };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <form
      onSubmit={handleSubmit(editUserData)}
className=" w-[90vw] sm:max-w-[450px] md:max-w-[600px] mx-auto bg-gradient-to-br from-orange-200 to-white p-6 border rounded-lg shadow-md space-y-4"    >
      <h2 className="text-xl font-bold">Edit Profile</h2>
      <div className="flex flex-col items-center gap-4">
        <img
          src={profileData.profile_picture}
          alt="Profile"
          className="w-20 h-20 mt-2 rounded-full border border-black"
        />
        <label className="block mb-1">Profile Picture URL</label>
        {/* <Input
          {...register("profile_picture")}
          className="w-full border p-2 rounded"
        /> */}
      </div>

      <div>
        <label className="block mb-1">Full Name</label>
        <Input
          {...register("full_name", { required: "Full name is required" })}
          className="w-full border p-2 rounded"
        />
        {errors.full_name && (
          <p className="text-red-500">{errors.full_name.message}</p>
        )}
      </div>

      <div>
        <label className="block mb-1">Age</label>
        <Input
          type="number"
          {...register("age", { valueAsNumber: true })}
          className="w-full border p-2 rounded"
        />
      </div>

      <div>
        <label className="block mb-1">Country</label>
        <Input {...register("country")} className="w-full border p-2 rounded" />
      </div>

      <div>
        <label className="block mb-1">Gender</label>

        <Controller
          name="gender"
          control={control}
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger className="cursor-pointer">
                <SelectValue placeholder="Select Gender" />
              </SelectTrigger>
              <SelectContent>
                {["male", "female"].map((gender) => (
                  <SelectItem
                    key={gender}
                    value={gender}
                    className="cursor-pointer"
                  >
                    {gender.charAt(0).toUpperCase() + gender.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
      </div>

      <div>
        <label className="block mb-1">Mobile</label>
        <Input {...register("mobile")} className="w-full border p-2 rounded" />
      </div>

      <div className="flex items-center justify-center">
        <Button
          type="submit"
          className={`${
            isSubmitting
              ? "bg-transparent hover:bg-transparent focus:bg-transparent active:bg-transparent my-3 text-xs "
              : " outline-none p-2 px-16 rounded-md text-white font-semibold my-3 cursor-pointer flex items-center justify-center hover:scale-100 text-lg "
          } `}
        >
          {isSubmitting ? <LoaderOne /> : "Submit"}
        </Button>
      </div>
    </form>
  );
}
