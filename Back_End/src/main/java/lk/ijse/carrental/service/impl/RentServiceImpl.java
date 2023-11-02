package lk.ijse.carrental.service.impl;

import lk.ijse.carrental.dto.PaymentSlipDTO;
import lk.ijse.carrental.dto.RentDTO;
import lk.ijse.carrental.dto.RentDetailDTO;
import lk.ijse.carrental.entity.*;
import lk.ijse.carrental.repo.*;
import lk.ijse.carrental.service.RentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
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

        System.out.println ("=================================================");
        System.out.println (dto.getRent_ID ());
        System.out.println ("=================================================");

        Customer customer = customerRepo.findById (dto.getCusID ()).get ();

        List<Rent_Detail> rentDetailList = new ArrayList<> ();

        for (RentDetailDTO d : dto.getRentDetailList ()) {
            Rent_Detail r = new Rent_Detail ();
            r.setRentID (d.getRent_id ());
            r.setCarID (d.getCarID ());
            r.setDriverID (d.getDriverID ());
            r.setStatus (d.getStatus ());

            rentDetailList.add (r);
        }

        rentRepo.save (new Rent (
                dto.getRent_ID (),
                dto.getPickUpDate (),
                dto.getPickUpTime (),
                dto.getReturnDate (),
                dto.getReturnTime (),
                "",
                customer,
                new Payment (dto.getPayment ().getPaymentID (), dto.getPayment ().getPayment (), dto.getPayment ().getPaymentExtraMilage (), dto.getPayment ().getWavierPayment ()),
                rentDetailList

        ));
    }

    @Override
    public String rentIDGenerate() {
        return rentRepo.getLastIndex ();
    }

    @Override
    public void savePaymentImage(PaymentSlipDTO dto) {
        Rent rent = rentRepo.findById(dto.getPaymentID ()).get();

        try {
            byte[] pLicenseBytes = dto.getWavierSlip ().getBytes ();

            String projectPath="/Users/imanadithya/Software Engineering/IJSE/PROJECTS/Car_Rental_System/Front_End/assets";
            Path pLicenceLocation = Paths.get(projectPath + "/projectImages/bucket/payment/pay_" + dto.getPaymentID () + ".jpeg");

            Files.write(pLicenceLocation, pLicenseBytes);
            dto.getWavierSlip ().transferTo(pLicenceLocation);


        } catch (IOException e) {
            throw new RuntimeException (e);
        }

        rent.setFilePath_1 ("/assets/projectImages/bucket/payment/pay_" + dto.getPaymentID ()+".jpeg");
        rentRepo.save(rent);
    }
    //@Override
    //  public void saveRent(RentDTO dto) {
//        dto.setRentID ("RE001");
//        dto.setFullPaymentStatus ("Yes");
//
//        dto.setCustomerID ("C001");
//        Customer customer = customerRepo.findById(dto.getCustomerID ()).get();
//
//
//        dto.setDriverID ("D001");
//        Driver driver = driverRepo.findById(dto.getDriverID ()).get();
//
//        dto.setCarID ("CR001");
//        Car car = carRepo.findById(dto.getCarID ()).get();
//
//       // dto.setPaymentId ("P001");
//      //  Payment payment = paymentRepo.findById(dto.getPaymentId ()).get();
//
//        Payment payment=new Payment ("P001","PPP","PP","p");
//
//        List<Rent_Detail> rentDetailList=new ArrayList<> ();
//
//        Rent_Detail rentDetail=new Rent_Detail ();
//        rentDetail.setRentID (dto.getRentID ());
//        rentDetail.setCarID (dto.getCarID ());
//        rentDetail.setDriverID (dto.getDriverID ());
//        rentDetail.setPayment (payment);
//
//        rentDetailList.add (rentDetail);
//
//         rentRepo.save (new Rent (dto.getRentID (), dto.getFullPaymentStatus (),customer,rentDetailList));

    //   }

}