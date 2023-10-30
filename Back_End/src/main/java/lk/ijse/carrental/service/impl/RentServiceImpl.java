package lk.ijse.carrental.service.impl;

import lk.ijse.carrental.dto.RentDTO;
import lk.ijse.carrental.dto.RentDetailDTO;
import lk.ijse.carrental.entity.*;
import lk.ijse.carrental.repo.*;
import lk.ijse.carrental.service.RentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class RentServiceImpl implements RentService {

    @Autowired
    RentRepository rentRepo;

    @Autowired
    CustomerRepository customerRepo;

    @Autowired
    DriverRepository driverRepo;

    @Autowired
    CarRepository carRepo;
    @Autowired
    PaymentRepository paymentRepo;
    @Override
    public void saveRent(RentDTO dto) {
        dto.setRentID ("RE001");
        dto.setFullPaymentStatus ("Yes");

        dto.setCustomerID ("C001");
        Customer customer = customerRepo.findById(dto.getCustomerID ()).get();


        dto.setDriverID ("D001");
        Driver driver = driverRepo.findById(dto.getDriverID ()).get();

        dto.setCarID ("CR001");
        Car car = carRepo.findById(dto.getCarID ()).get();

       // dto.setPaymentId ("P001");
      //  Payment payment = paymentRepo.findById(dto.getPaymentId ()).get();

        Payment payment=new Payment ("P001","PPP","PP","p");

        List<Rent_Detail> rentDetailList=new ArrayList<> ();

        Rent_Detail rentDetail=new Rent_Detail ();
        rentDetail.setRentID (dto.getRentID ());
        rentDetail.setCarID (dto.getCarID ());
        rentDetail.setDriverID (dto.getDriverID ());
        rentDetail.setPayment (payment);

        rentDetailList.add (rentDetail);

         rentRepo.save (new Rent (dto.getRentID (), dto.getFullPaymentStatus (),customer,rentDetailList));

    }
}
