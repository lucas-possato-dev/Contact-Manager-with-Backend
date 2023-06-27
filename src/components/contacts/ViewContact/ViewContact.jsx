import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { ContactService } from "../../../services/ContactService";
import Spinner from "../../Spinner/Spinner";

function ViewContact() {
  const { contactId } = useParams();

  const [state, setState] = useState({
    loading: false,
    contact: {},
    errorMessage: "",
    group: {},
  });

  useEffect(() => {
    const fetchContactId = async () => {
      try {
        setState({ ...state, loading: true });
        const response = await ContactService.getContact(contactId);
        const groupResponse = await ContactService.getGroup(response.data);
        setState({
          ...state,
          loading: false,
          contact: response.data,
          group: groupResponse.data,
        });
      } catch (error) {
        setState({
          ...state,
          loading: false,
          errorMessage: error.message,
        });
      }
    };
    fetchContactId();
  }, [contactId]);

  const { loading, contact, errorMessage, group } = state;

  return (
    <>
      <section className="view-contact-intro p-3">
        <div className="container">
          <div className="row">
            <div className="col">
              <p className="h3 text-success fw-bold">View Contact</p>
              <p className="fst-italic">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nulla
                commodi nesciunt, vel sed nostrum sapiente quam velit adipisci
                autem nemo quaerat asperiores sit quae. Atque rem praesentium
                nobis. Dolore, nisi.
              </p>
            </div>
          </div>
        </div>
      </section>
      {loading ? (
        <Spinner />
      ) : (
        <>
          {Object.keys(contact).length > 0 && Object.keys(group).length > 0 && (
            <section className="view-contact mt-3">
              <div className="container">
                <div className="row align-items-center">
                  <div className="col-md-4">
                    <img
                      src={contact.photo}
                      alt="image"
                      className="contact-img"
                    />
                  </div>
                  <div className="col-md-8">
                    <ul className="list-group">
                      <li className="list-group-item list-group-item-action">
                        Name: <span className="fw-bold">{contact.name}</span>
                      </li>
                      <li className="list-group-item list-group-item-action">
                        Mobile:{" "}
                        <span className="fw-bold">{contact.mobile}</span>
                      </li>
                      <li className="list-group-item list-group-item-action">
                        Email: <span className="fw-bold">{contact.email}</span>
                      </li>
                      <li className="list-group-item list-group-item-action">
                        Company:{" "}
                        <span className="fw-bold">{contact.company}</span>
                      </li>
                      <li className="list-group-item list-group-item-action">
                        Title: <span className="fw-bold">{contact.title}</span>
                      </li>
                      <li className="list-group-item list-group-item-action">
                        Group: <span className="fw-bold">{group.name}</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <Link className="btn btn-dark" to={"/contacts/list"}>
                      Back
                    </Link>
                  </div>
                </div>
              </div>
            </section>
          )}
        </>
      )}
    </>
  );
}

export default ViewContact;
