package com.example.demo;

import com.example.demo.entitie.Account;
import com.example.demo.repositories.AccountRepo;
import com.example.demo.service.AccountServiceImpl;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;
import static org.mockito.BDDMockito.verify;
import static org.mockito.BDDMockito.given;
import static org.assertj.core.api.Assertions.assertThat;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.List;

@SpringBootTest
@ExtendWith(MockitoExtension.class)
class KadromierzApplicationTests {

	@Mock
	private AccountRepo accountRepo;
	@InjectMocks
	private AccountServiceImpl accountService;
	@Test
	void getAllAccounts(){
		// Przygotowanie danych testowych
		Account account1 = new Account("test1@example.com","test1","USER");
		Account account2 = new Account("test2@example.com","test2","USER");
		List<Account> accounts = Arrays.asList(account1, account2);

		// Ustawienie zachowania mocka
		given(accountRepo.findAll()).willReturn(accounts);

		// Wywołanie metody do przetestowania
		List<Account> result = accountService.findAll();

		// Sprawdzenie wyniku
		assertThat(result).isNotNull();
		assertThat(result.size()).isEqualTo(2);
	}


}
