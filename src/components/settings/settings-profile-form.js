import { Link, useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { authActions } from "../../redux/auth/authSlice";
import Input from "../inputs/input";
import Button from "../button";
import { toast } from "react-toastify";

export default function SettingsProfileForm() {
  const schema = new yup.ObjectSchema({
    userName: yup
      .string()
      .required("Username is required.")
      .matches(/^[a-zA-Z0-9_]+$/, "Only alphabets are allowed for this field.")
      .min(3, "Username must be at least 3 characters.")
      .max(15, "Username must be at most 15 characters."),
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
    setError,
    clearErrors,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) setValue("userName", user.userName);
  }, [user]);

  const checkUserName = (e) => {
    const userName = e.target.value;
    dispatch(
      authActions.checkUserNameRequest({
        userName,
        userId: user?._id,
        onSuccess: (isAvailable) => {
          if (isAvailable) {
            clearErrors("userName");
          } else {
            setError("userName", {
              type: "manuel",
              message: "This username already exists.",
            });
          }
        },
      })
    );
  };

  const onSubmit = ({ userName }) => {
    setIsLoading(true);
    dispatch(
      authActions.updateUserFieldsRequest({
        userId: user?._id,
        fields: {
          userName,
        },
        onSuccess: () => {
          setIsLoading(false);
          toast.success("Profile updated successfully");
        },
        onFailure: (errorList) => {
          _.forEach(errorList.items, (err) => {
            setError("userName", {
              type: "manuel",
              message: "This username already exists.",
            });
          });
          setIsLoading(false);
        },
      })
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="shadow sm:rounded-md sm:overflow-hidden">
        <div className="bg-white py-6 px-4 space-y-6 sm:p-6">
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Profile
            </h3>
          </div>

          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-6 sm:col-span-3">
              <Input
                label="Username"
                id="userName"
                name="userName"
                placeholder="johndoe"
                onBlur={checkUserName}
                register={register("userName")}
                error={errors.userName}
              />
            </div>

            {/* <div className="col-span-3">
            <label className="block text-sm font-medium text-gray-700">
              Photo
            </label>
            <div className="mt-1 flex items-center">
              <span className="inline-block bg-gray-100 rounded-full overflow-hidden h-12 w-12">
                <svg
                  className="h-full w-full text-gray-300"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </span>
              <button
                type="button"
                className="ml-5 bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
              >
                Change
              </button>
            </div>
          </div> */}
          </div>
        </div>
        <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
          <Button
            type="submit"
            className="bg-pink-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
            loading={isLoading}
          >
            Save
          </Button>
        </div>
      </div>
    </form>
  );
}
