import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { ContactService } from "../../../services/ContactService";

function AddContact() {
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

  const updateInput = (event) => {
    setState({
      ...state,
      contact: {
        ...state.contact,
        [event.target.name]: event.target.value,
      },
    });
  };

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        setState({ ...state, loading: true });
        const response = await ContactService.getGroups();
        setState({
          ...state,
          loading: false,
          groups: response.data,
        });
      } catch (error) {}
    };
    fetchGroups();
  }, []);

  const submitForm = async (event) => {
    event.preventDefault();
    try {
      const response = await ContactService.createContact(state.contact);
      if (response) {
        navigate("/contacts/list", { replace: true });
      }
    } catch (error) {
      setState({ ...state, errorMessage: error.message });
      navigate("/contacts/add", { replace: false });
    }
  };

  const { loading, contact, groups, errorMessage } = state;

  return (
    <>
      <section className="add-contact p-3">
        <div className="container">
          <div className="row">
            <div className="col">
              <p className="h4 text-success fw-bold">Create Contact</p>
              <p className="fst-italic">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet
                quibusdam quas libero autem ut neque molestias? Iure natus at
                beatae autem quisquam id asperiores minima, porro harum,
                doloremque pariatur. Veritatis?
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4">
              <form onSubmit={submitForm}>
                <div className="mb-2">
                  <input
                    name="name"
                    required={true}
                    value={contact.name}
                    onChange={updateInput}
                    type="text"
                    className="form-control"
                    placeholder="Name"
                  />
                </div>
                <div className="mb-2">
                  <input
                    type="text"
                    name="photo"
                    required={true}
                    value={contact.photo}
                    onChange={updateInput}
                    className="form-control"
                    placeholder="Photo Url"
                  />
                </div>
                <div className="mb-2">
                  <input
                    name="mobile"
                    required={true}
                    value={contact.mobile}
                    onChange={updateInput}
                    type="number"
                    className="form-control"
                    placeholder="Mobile"
                  />
                </div>
                <div className="mb-2">
                  <input
                    name="email"
                    required={true}
                    value={contact.email}
                    onChange={updateInput}
                    type="email"
                    className="form-control"
                    placeholder="Email"
                  />
                </div>
                <div className="mb-2">
                  <input
                    type="text"
                    name="company"
                    required={true}
                    value={contact.company}
                    onChange={updateInput}
                    className="form-control"
                    placeholder="Company"
                  />
                </div>
                <div className="mb-2">
                  <input
                    name="title"
                    required={true}
                    value={contact.title}
                    onChange={updateInput}
                    type="text"
                    className="form-control"
                    placeholder="Title"
                  />
                </div>
                <div className="mb-2">
                  <select
                    name="groupId"
                    required={true}
                    value={contact.groupId}
                    onChange={updateInput}
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
                    className="btn btn-success"
                    value="Create"
                  />
                  <Link className="btn btn-dark ms-2" to={"/contacts/list"}>
                    Cancel
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default AddContact;
