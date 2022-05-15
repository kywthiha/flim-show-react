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
import { fetchShowMovie } from "../../actions/show-movie.action";
import moment from "moment";
export default function ShowMovieIndex() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data, inProgress, errors } = useSelector((state) => state.showMovie);
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
    await fetchShowMovie()(dispatch);
    nprogress.done();
  }, []);

  return (
    <Layout>
      <div className="flex justify-center">
        <div className="w-full p-3 max-w-7xl">
          {data ? (
            <h1 className="text-3xl">You can catch the time {moment(data).format('hh:mm A')} </h1>
          ) : (
            <h1 className="text-3xl">Empty</h1>
          )}
        </div>
      </div>
    </Layout>
  );
}
