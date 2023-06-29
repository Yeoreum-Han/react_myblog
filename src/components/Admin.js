import ListForm from "./ListForm";

const Admin = () => {
  return (
    <div className="comp d-flex flex-column">
      <h3 className="reviewsTitle mb-5">Admin</h3>
      <ListForm isAdmin = {true} />
    </div>
  );
};
export default Admin;
