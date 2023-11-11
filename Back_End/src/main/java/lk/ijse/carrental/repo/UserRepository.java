package lk.ijse.carrental.repo;

import lk.ijse.carrental.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface UserRepository extends JpaRepository<User,String> {
    boolean existsByUserName(String userName);
    User findByUserName(String userName);

    @Modifying
    @Query(value = "UPDATE User set password=:pass where userName=:uName", nativeQuery = true)
    void changePassword(@Param ("pass") String password,@Param ("uName") String userName);



//
//    @Modifying
//    @Query(value = "UPDATE Car set availability='NO' where carID=:car_ID ", nativeQuery = true)
//    void updateAvailabilityCar(@Param("car_ID") String id);

}
