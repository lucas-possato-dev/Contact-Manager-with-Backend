import { Link, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { ContactService } from "../../../services/ContactService";
import Spinner from "../../Spinner/Spinner";

function EditContact() {
  const { contactId } = useParams();
  const navigate = useNavigate();

  const [state, setState] = useState({
    loading: false,
    contact: {
      name: "",
      photo: "",
      mobile: "",
      email: "",
      company: "",
      title: "",
      groupId: "",
    },
    groups: [],
    errorMessage: "",
  });

  useEffect(() => {
    const fetchContactUpdate = async () => {
      try {
        setState({ ...state, loading: true });
        const response = await ContactService.getContact(contactId);
        const groupResponse = await ContactService.getGroups();
        setState({
          ...state,
          loading: false,
          contact: response.data,
          groups: groupResponse.data,
        });
      } catch (error) {
        setState({
          ...state,
          loading: false,
          errorMessage: error.message,
        });
      }
    };
    fetchContactUpdate();
  }, [contactId]);

  const updateInput = (event) => {
    setState({
      ...state,
      contact: {
        ...state.contact,
        [event.target.name]: event.target.value,
      },
    });
  };

  const submitForm = async (event) => {
    event.preventDefault();
    try {
      const response = await ContactService.updateContact(
        state.contact,
        contactId
      );
      if (response) {
        navigate("/contacts/list", { replace: true });
      }
    } catch (error) {
      setState({ ...state, errorMessage: error.message });
      navigate(`/contacts/edit/${contactId}`, { replace: false });
    }
  };

  const { loading, contact, groups, errorMessage } = state;

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          {" "}
          <section className="add-contact p-3 ">
            <div className="container">
              <div className="row">
                <div className="col">
                  <p className="h4 text-primary fw-bold">Edit Contact</p>
                  <p className="fst-italic">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Eveniet quibusdam quas libero autem ut neque molestias? Iure
                    natus at beatae autem quisquam id asperiores minima, porro
                    harum, doloremque pariatur. Veritatis?
                  </p>
                </div>
              </div>
              <div className="row align-items-center">
                <div className="col-md-4">
                  <form onSubmit={submitForm}>
                    <div className="mb-2">
                      <input
                        required="true"
                        name="name"
                        onChange={updateInput}
                        value={contact.name}
                        type="text"
                        className="form-control"
                        placeholder="Name"
                      />
                    </div>
                    <div className="mb-2">
                      <input
                        required="true"
                        name="photo"
                        onChange={updateInput}
                        value={contact.photo}
                        type="text"
                        className="form-control"
                        placeholder="Photo Url"
                      />
                    </div>
                    <div className="mb-2">
                      <input
                        required="true"
                        name="mobile"
                        onChange={updateInput}
                        value={contact.mobile}
                        type="number"
                        className="form-control"
                        placeholder="Mobile"
                      />
                    </div>
                    <div className="mb-2">
                      <input
                        required="true"
                        name="email"
                        onChange={updateInput}
                        value={contact.email}
                        type="email"
                        className="form-control"
                        placeholder="Email"
                      />
                    </div>
                    <div className="mb-2">
                      <input
                        required="true"
                        name="company"
                        onChange={updateInput}
                        value={contact.company}
                        type="text"
                        className="form-control"
                        placeholder="Company"
                      />
                    </div>
                    <div className="mb-2">
                      <input
                        required="true"
                        name="title"
                        onChange={updateInput}
                        value={contact.title}
                        type="text"
                        className="form-control"
                        placeholder="Title"
                      />
                    </div>
                    <div className="mb-2">
                      <select
                        required="true"
                        name="groupId"
                        onChange={updateInput}
                        value={contact.groupId}
                        className="form-control"
                      >
                        <option value="">Select a Group</option>
                        {groups.length > 0 &&
                          groups.map((group) => {
                            return (
                              <option value={group.id} key={group.id}>
                                {group.name}
                              </option>
                            );
                          })}
                      </select>
                    </div>
                    <div className="mb-2">
                      <input
                        type="submit"
                        className="btn btn-primary"
                        value="Update"
                      />
                      <Link className="btn btn-dark ms-2" to={"/contacts/list"}>
                        Cancel
                      </Link>
                    </div>
                  </form>
                </div>
                <div className="col-md-6">
                  <img className="contact-img" src={contact.photo} alt="" />
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
}

export default EditContact;
