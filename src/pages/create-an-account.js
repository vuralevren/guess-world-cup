import { Link } from "react-router-dom";
import Button from "../components/button";
import Input from "../components/inputs/input";
import Logo from "../components/logo";
import AuthSidebar from "../components/auth-sidebar";

export default function CreateAnAccount() {
  return (
    <div className="relative h-screen">
      <div className="grid xl:grid-cols-2 h-full">
        <div className="flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-lg lg:w-[360px]">
            <div className="flex flex-col items-center">
              <Logo />
              <h2 className="text-4xl font-bold text-slate-800">Register</h2>
              <p className="mt-3 text-base text-slate-600 tracking-sm">
                Start enjoying.
              </p>
            </div>

            <div className="mt-8">
              <div className="mt-6">
                <form
                  // onSubmit={handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <Input
                    label="Username"
                    id="username"
                    name="username"
                    placeholder="johndoe"
                    // register={register("username")}
                    // error={errors.username}
                    // onBlur={checkUsername}
                  />

                  <Input
                    label="Email"
                    id="email"
                    name="email"
                    placeholder="johndoe@example.com"
                    // register={register("email")}
                    // error={errors.email}
                  />

                  <div className="space-y-1">
                    <div className="mt-1">
                      <div className="space-y-1">
                        <Input
                          label="Password"
                          id="password"
                          name="password"
                          type="password"
                          //   register={register("password")}
                          //   error={errors.password}
                        />
                      </div>

                      <span className="inline-block text-slate-500 mt-2 text-sm tracking-sm">
                        Must be at least 8 characters.
                      </span>
                    </div>
                  </div>

                  <div>
                    <Button
                      type="submit"
                      className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                      // loading={loading}
                    >
                      Get started
                    </Button>
                  </div>
                  <div className="mt-6 relative">
                    <div
                      className="absolute inset-0 flex items-center"
                      aria-hidden="true"
                    >
                      <div className="w-full border-t border-gray-300" />
                    </div>
                  </div>
                </form>
                <p className="text-center text-sm text-slate-500 mt-10">
                  You have already an account?{" "}
                  <Link
                    to="/sign-in"
                    className="font-medium text-pink-700 tracking-sm hover:text-pink-500"
                  >
                    Login
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
        <AuthSidebar />
      </div>
    </div>
  );
}
