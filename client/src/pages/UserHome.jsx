import useAuth from "../hooks/useAuth";

const UserHome = () =>{
    useAuth()
    return (
        <div>UserHome</div>
    )
}

export default UserHome;