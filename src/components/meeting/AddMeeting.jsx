import React,{useState} from "react";
import { useForm } from "react-hook-form";
import Header from "../Header";
import Sidebar from "../Sidebar";
import { DatePicker, TimePicker } from "antd";
import moment from "moment";
import { Link ,useNavigate} from "react-router-dom";
import FeatherIcon from "feather-icons-react/build/FeatherIcon";
import { addDocument } from "../../services/dbService";

const AddMeeting = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors }, setValue, getValues ,reset} = useForm({
    defaultValues: {
      title: "",
      startDate: null,
      endDate: null,
      startTime: null,
      endTime: null,
      houseOwner: "",
      zipCode: "",
      streetAddress: "",
      capacity: "",
    }
  });

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [submitting, setSubmitting] = useState(false); // For button text and disabling it


  const onSubmit = async (data) => {
    setSubmitting(true); // Disable the button and change text to submitting...

    const formattedData = {
      ...data,
      startDate: startDate ? startDate.toDate() : null,
      endDate: endDate ? endDate.toDate() : null,
      startTime: startTime ? startTime.toDate() : null,
      endTime: endTime ? endTime.toDate() : null,
    };

    try {
      await addDocument("meetings", formattedData);
      console.log("Document added successfully!");
      reset(); // Clear form after successful submission
      setStartDate(null);
      setEndDate(null);
      setStartTime(null);
      setEndTime(null);
      navigate("/meetinglist");
    } catch (error) {
      console.error("Error adding document: ", error);
    }finally {
      setSubmitting(false); // Re-enable the button
    }
  };

  

  return (
    <div>
      <Header />
      <Sidebar id="menu-item2" activeClassName="add-meeting" />
      <div className="page-wrapper">
        <div className="content">
          <div className="page-header">
            <div className="row">
              <div className="col-sm-12">
                <ul className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/meetinglist">Meetings</Link>
                  </li>
                  <li className="breadcrumb-item">
                    <i className="feather-chevron-right">
                      <FeatherIcon icon="chevron-right" />
                    </i>
                  </li>
                  <li className="breadcrumb-item active">Add Meeting</li>
                </ul>
              </div>
            </div>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
              <div className="col-12">
                <div className="form-group">
                  <label className="text-dark">Title <span className="login-danger">*</span></label>
                  <input className="form-control" {...register("title", { required: "This field is required" })} />
                  {errors.title && <div className="error text-danger">{errors.title.message}</div>}
                </div>
              </div>
              <div className="col-12 col-md-4">
                <div className="form-group">
                  <label className="text-dark">Start Date <span className="login-danger">*</span></label>
                  <DatePicker
                    className="form-control"
                    onChange={ (date)=> {setStartDate(date); setValue('startDate', date);} }
                    value={getValues("startDate")}
                  />
                  {errors.startDate && <div className="error text-danger">{errors.startDate.message}</div>}
                </div>
              </div>
              <div className="col-12 col-md-4">
                <div className="form-group">
                  <label className="text-dark">End Date <span className="login-danger">*</span></label>
                  <DatePicker
                    className="form-control"
                    onChange={ (date)=> {setEndDate(date); setValue('endDate', date);} }
                    value={getValues("endDate")}
                  />
                  {errors.endDate && <div className="error text-danger">{errors.endDate.message}</div>}
                </div>
              </div>
              <div className="col-12 col-md-4">
                <div className="form-group">
                  <label className="text-dark">Start Time <span className="login-danger">*</span></label>
                  <TimePicker
                    className="form-control"
                    use12Hours
                    format="h:mm a"
                    onChange={(time) => { setStartTime(time); setValue('startTime', time); }}
                    value={getValues("startTime")}
                  />
                  {errors.startTime && <div className="error text-danger">{errors.startTime.message}</div>}
                </div>
              </div>
              <div className="col-12 col-md-4">
                <div className="form-group">
                  <label className="text-dark">End Time <span className="login-danger">*</span></label>
                  <TimePicker
                    className="form-control"
                    use12Hours
                    format="h:mm a"
                    onChange={(time) => { setEndTime(time); setValue('endTime', time); }}
                    value={getValues("endTime")}
                  />
                  {errors.endTime && <div className="error text-danger">{errors.endTime.message}</div>}
                </div>
              </div>
              <div className="col-12">
                <div className="form-group">
                  <label className="text-dark">House Owner <span className="login-danger">*</span></label>
                  <input className="form-control" {...register("houseOwner", { required: "This field is required" })} />
                  {errors.houseOwner && <div className="error text-danger">{errors.houseOwner.message}</div>}
                </div>
              </div>
              <div className="col-12">
                <div className="form-group">
                  <label className="text-dark">Street Address <span className="login-danger">*</span></label>
                  <input className="form-control" {...register("streetAddress", { required: "This field is required" })} />
                  {errors.streetAddress && <div className="error text-danger">{errors.streetAddress.message}</div>}
                </div>
              </div>
              <div className="col-12 col-md-6">
                <div className="form-group">
                  <label className="text-dark">ZIP Code <span className="login-danger">*</span></label>
                  <input className="form-control" {...register("zipCode", { required: "This field is required" })} />
                  {errors.zipCode && <div className="error text-danger">{errors.zipCode.message}</div>}
                </div>
              </div>
              <div className="col-12 col-md-6">
                <div className="form-group">
                  <label className="text-dark">Capacity <span className="login-danger">*</span></label>
                  <input className="form-control" type="number" {...register("capacity", { required: "This field is required" })} />
                  {errors.capacity && <div className="error text-danger">{errors.capacity.message}</div>}
                </div>
              </div>
              <div className="col-12">
                <div className="doctor-submit text-end">
                <button type="submit" className="btn btn-primary submit-form me-2" disabled={submitting}>
                {submitting ? "Submitting..." : "Submit"}
              </button>                  <button type="button" className="btn btn-primary cancel-form">Cancel</button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddMeeting;
