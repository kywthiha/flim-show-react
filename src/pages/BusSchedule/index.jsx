import nprogress from "nprogress";
import { Fragment, useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import "nprogress/nprogress.css";
import Layout from "../../components/Layout";
import { handleError } from "../../helper";
import ValidationErrors from "../../components/ValidationErrors";
import TimePicker from "../../components/TimePicker";
import { ErrorMessage } from "@hookform/error-message";
import { PlusCircleIcon } from "@heroicons/react/outline";
import moment from "moment";

import {
  fetchBusScheudle,
  storeBusScheudle,
} from "../../actions/bus-schedule.action";

export default function BusScheduleIndex() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data, inProgress, errors } = useSelector(
    (state) => state.busSchedule
  );
  const [searchParams] = useSearchParams();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    formState: { errors: formErrors },
  } = useForm();

  useEffect(async () => {
    nprogress.start();
    await fetchBusScheudle()(dispatch);
    nprogress.done();
  }, []);

  const onSubmit = async (values) => {
    try {
      console.log(values);
      await storeBusScheudle({ bus_schedule: values })(dispatch);
    } catch (e) {
      handleError(e);
    }
  };

  return (
    <Layout>
      <div className="flex justify-center">
        <div className="w-full p-3 max-w-7xl">
          <form onSubmit={handleSubmit(onSubmit)}>
            <ValidationErrors errors={errors} />
            <div className="flex gap-2 items-center">
              <label htmlFor="bus_time">Bus Time</label>
              <TimePicker
                onChange={(value) => setValue("bus_time", value)}
                registerProps={{
                  ...register("bus_time", {
                    required: "Please select one option",
                  }),
                }}
              />
            </div>
            <ErrorMessage
              render={({ message }) => (
                <p className="text-red-500 text-xs">{message}</p>
              )}
              errors={formErrors}
              name="bus_time"
            />

            <div className="flex justify-start">
              <button
                type="submit"
                disabled={inProgress}
                className={`inline-flex mt-4 items-center px-4 py-3 bg-primary border border-transparent rounded font-semibold text-xs text-white uppercase tracking-widest active:bg-cyan-900 transition ease-in-out duration-150 ${
                  inProgress ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {inProgress && (
                  <svg
                    role="status"
                    className="inline mr-3 w-4 h-4 text-white animate-spin"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="#E5E7EB"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentColor"
                    />
                  </svg>
                )}
                Save
              </button>
            </div>
          </form>

          {data && data.bus_time && (
            <table className="border-collapse border border-slate-500 mt-5">
              <thead>
                <tr>
                  <th className="border border-slate-600">No</th>
                  <th className="border border-slate-600">Bus Arrival Time</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-slate-600">1</td>
                  <td className="border border-slate-600">{moment(data.bus_time).format('hh:mm A')}</td>
                </tr>
              </tbody>
            </table>
          )}
        </div>
      </div>
    </Layout>
  );
}
