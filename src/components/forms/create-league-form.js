import { Link, useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import Button from "../button";
import Input from "../inputs/input";
import { leagueActions } from "../../redux/league/leagueSlice";
import { toast } from "react-toastify";

export default function CreateLeagueForm() {
  const schema = new yup.ObjectSchema({
    teamName: yup
      .string()
      .required("Team Name is required.")
      .trim()
      .min(3, "Team Name must be at least 3 characters.")
      .max(15, "Team Name must be at most 15 characters."),
    leagueName: yup
      .string()
      .required("League Name is required ")
      .trim()
      .min(3, "League Name must be at least 3 characters.")
      .max(15, "League Name must be at most 15 characters."),
    leaguePassword: yup
      .string()
      .min(8, "Password must be at least 8 characters.")
      .max(50, "Password must be at most 50 characters.")
      .required("Password is required."),
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const [formAvailable, setFormAvailable] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const checkLeagueName = (e) => {
    const leagueName = e.target.value;
    dispatch(
      leagueActions.checkLeagueNameRequest({
        leagueName,
        onSuccess: (isAvailable) => {
          if (isAvailable) {
            clearErrors("leagueName");
            setFormAvailable(true);
          } else {
            setError("leagueName", {
              type: "manuel",
              message: "This name already exists.",
            });
            setFormAvailable(false);
          }
        },
      })
    );
  };

  const onSubmit = (formValues) => {
    setIsLoading(true);
    dispatch(
      leagueActions.createRequest({
        ...formValues,
        userName: user?.userName,
        onSuccess: (leagueSlug) => {
          navigate(`/league/${leagueSlug}`);
          setIsLoading(false);
        },
        onFailure: (errorList) => {
          toast.error("Something wrong!");
          setIsLoading(false);
        },
      })
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        label="Team Name"
        id="teamName"
        name="teamName"
        placeholder="Brazil"
        register={register("teamName")}
        error={errors.teamName}
      />
      <Input
        label="League Name"
        id="leagueName"
        name="leagueName"
        placeholder="World League"
        onBlur={checkLeagueName}
        register={register("leagueName")}
        error={errors.leagueName}
      />
      <Input
        label="League Password"
        id="leaguePassword"
        name="leaguePassword"
        type="password"
        register={register("leaguePassword")}
        error={errors.leaguePassword}
      />
      <Button
        type={formAvailable ? "submit" : "button"}
        className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-pink-600 text-base font-medium text-white hover:bg-pink-700 sm:text-sm mt-5 sm:mt-6"
        loading={isLoading}
      >
        Create
      </Button>
    </form>
  );
}