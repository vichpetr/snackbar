package cz.tmobile.cdcp.snackbar.backend.service.impl.qrpayment;

import cz.tmobile.cdcp.snackbar.backend.exceptions.ValidationException;
import cz.tmobile.cdcp.snackbar.backend.model.dto.qrpayment.CzechAccountDto;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.iban4j.*;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Slf4j
@Service
public class ConvertAccountService {

    public Iban convertToIban(CzechAccountDto accountDto) {
        if (StringUtils.isBlank(accountDto.getNumber()) || StringUtils.isBlank(accountDto.getBankCode())) {
            throw new ValidationException(log, UUID.randomUUID(), "Bank account is not valid - input dto is{}", accountDto);
        }

        String accountNumber;
        if (StringUtils.isBlank(accountDto.getPrefix())) {
            accountNumber = accountDto.getNumber();
        } else {
            accountNumber = accountDto.getPrefix().concat(accountDto.getNumber());
        }
        try {
            return new Iban.Builder()
                    .countryCode(CountryCode.CZ)
                    .bankCode(accountDto.getBankCode())
                    .accountNumber(StringUtils.leftPad(accountNumber, 16, '0'))
                    .build();
        } catch (IbanFormatException | InvalidCheckDigitException | UnsupportedCountryException e) {
            throw new ValidationException(log, UUID.randomUUID(), "Bank account after convert to iban is not valid - account is{}", accountDto);
        }
    }
}
