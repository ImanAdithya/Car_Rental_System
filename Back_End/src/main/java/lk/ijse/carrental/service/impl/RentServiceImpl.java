package lk.ijse.carrental.service.impl;

import lk.ijse.carrental.dto.*;
import lk.ijse.carrental.entity.*;
import lk.ijse.carrental.repo.*;
import lk.ijse.carrental.service.RentService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
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

    @Autowired
    ModelMapper mapper;

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

            rentDetailList.add (r);
        }

        Rent rent=new Rent (
                dto.getRent_ID (),
                dto.getPickUpDate (),
                dto.getPickUpTime (),
                dto.getReturnDate (),
                dto.getReturnTime (),
                "",
                dto.getStatus (),
                customer,
                new Payment (dto.getPayment ().getPaymentID (), dto.getPayment ().getPaymentAmount (), dto.getPayment ().getPaymentExtraMilage (), dto.getPayment ().getWavierPayment ()),
                rentDetailList

        );

        System.out.println ("+++++++++++++++++++++++");
        System.out.println (rent);
        System.out.println ("+++++++++++++++++++++++");
        rentRepo.save (rent);
    }

    @Override
    public String rentIDGenerate() {
        return rentRepo.getLastIndex ();
    }

    @Override
    public void savePaymentImage(PaymentSlipDTO dto) {
        Rent rent = rentRepo.findById (dto.getRentID ()).get ();

        try {
            byte[] pLicenseBytes = dto.getWavierSlip ().getBytes ();

            String projectPath = "/Users/imanadithya/Software Engineering/IJSE/PROJECTS/Car_Rental_System/Front_End/assets";
            Path pLicenceLocation = Paths.get (projectPath + "/projectImages/bucket/payment/pay_" + dto.getRentID () + ".jpeg");

            Files.write (pLicenceLocation, pLicenseBytes);
            dto.getWavierSlip ().transferTo (pLicenceLocation);


        } catch (IOException e) {
            throw new RuntimeException (e);
        }

        rent.setFilePath_1 ("/assets/projectImages/bucket/payment/pay_" + dto.getRentID () + ".jpeg");
        rentRepo.save (rent);
    }

    @Override
    public List<RentDTO> getAllRent() {
        List<Rent> all = rentRepo.findAll();
        List<RentDTO> allRentDTOS=new ArrayList<>();

        for (Rent rent : all) {
            RentDTO rentDTO=new RentDTO ();
            rentDTO.setRent_ID (rent.getRentID ());
            rentDTO.setPickUpDate (rent.getPickUpDate ());
            rentDTO.setPickUpTime (rent.getPickUpTime ());
            rentDTO.setReturnDate (rent.getReturnDate ());
            rentDTO.setReturnTime (rent.getReturnTime ());
            rentDTO.setFilePath_1 (rent.getFilePath_1 ());
            rentDTO.setCusID (rent.getCustomerID ().getCusID ());
            Payment p = rent.getPayment ();
            rentDTO.setPayment (new PaymentDTO (p.getPayment (),p.getPayment (),p.getPaymentExtraMilage (),p.getWavierPayment ()));
            rentDTO.setStatus (rent.getStatus ());

            List<RentDetailDTO> detailsDTOS=new ArrayList<>();

            for (Rent_Detail rentDetail : rent.getRentDetails()) {

                RentDetailDTO rentDetails = new RentDetailDTO();
                rentDetails.setRent_id (rentDetail.getRentID());
                rentDetails.setCarID(rentDetail.getCarID());
                rentDetails.setDriverID(rentDetail.getDriverID());
                detailsDTOS.add(rentDetails);
            }
            rentDTO.setRentDetailList (detailsDTOS);
            allRentDTOS.add(rentDTO);
        }

        return allRentDTOS;

    }

    @Override
    public RentDTO getRent(String id) {
        Rent rent = rentRepo.findById (id).get ();

        System.out.println ("DDDDDDDDDDDD");
        System.out.println (rent.toString ());
        System.out.println ("DDDDDDDDDDDD");

        List<RentDetailDTO> detailsDTO=new ArrayList<>();
        RentDetailDTO rentDetails = new RentDetailDTO();

        for (Rent_Detail rentDetail :rent.getRentDetails ()) {
            rentDetails.setRent_id (rentDetail.getRentID());
            rentDetails.setCarID(rentDetail.getCarID());
            rentDetails.setDriverID(rentDetail.getDriverID());
        }
        detailsDTO.add (rentDetails);

        return new RentDTO (
                rent.getRentID (),
                rent.getPickUpDate (),
                rent.getPickUpTime (),
                rent.getReturnDate (),
                rent.getReturnTime (),
                rent.getFilePath_1 (),
                rent.getStatus (),
                rent.getCustomerID ().getCusID (),
                new PaymentDTO (rent.getPayment ().getPaymentID (),rent.getPayment ().getPayment (),rent.getPayment ().getPaymentExtraMilage (),rent.getPayment ().getWavierPayment ()),
                detailsDTO
        );
    }

    @Override
    public void updateRent(String rentID) {
         rentRepo.updateRent (rentID);
    }
}