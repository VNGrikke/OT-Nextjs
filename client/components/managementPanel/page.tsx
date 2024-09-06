import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '@/services/user.service';

export default function PanagementPanel() {
  const dispatch: any = useDispatch();
  const { users } = useSelector((state: any) => state.users);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);
  console.log(users);


  return (
    <div>
      <h2>User List</h2>
      <ul>
        {Array.isArray(users) && users.length > 0 ? (
          users.map((user: any) => (
            <li key={user.id}>{user.fullName}</li>
          ))
        ) : (
          <p>Loading...</p> 
        )}
      </ul>
    </div>
  );
}
