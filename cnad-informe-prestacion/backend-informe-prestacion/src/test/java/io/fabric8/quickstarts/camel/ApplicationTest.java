/*
 * Copyright 2005-2016 Red Hat, Inc.
 *
 * Red Hat licenses this file to you under the Apache License, version
 * 2.0 (the "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or
 * implied.  See the License for the specific language governing
 * permissions and limitations under the License.
 */

package io.fabric8.quickstarts.camel;

import org.junit.FixMethodOrder;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.MethodSorters;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.GregorianCalendar;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
@FixMethodOrder(MethodSorters.NAME_ASCENDING)
public class ApplicationTest {

    private String apiUri = "/cnad-api/prestaciones";

    @Autowired
    private TestRestTemplate restTemplate;

    @Test
    public void testA() {
        HttpEntity<Prestaciones> entity = new HttpEntity<Prestaciones>(new Prestaciones(1, "Patient Test", "Test exam", new GregorianCalendar(2018, 5, 7).getTime(), 2, new GregorianCalendar(2018, 5, 9).getTime(), "ak123-1231i2u-1k2uy3", 3, null));
        ResponseEntity<Prestaciones> prestacionResponse = restTemplate.exchange(apiUri,
            HttpMethod.POST, entity, Prestaciones.class);
        assertThat(prestacionResponse.getStatusCode()).isEqualTo(HttpStatus.OK);
        Prestaciones prestacion = prestacionResponse.getBody();
        assertThat(prestacion.getId()).isEqualTo(1);
        assertThat(prestacion.getPatient()).isEqualTo("Patient Test");
        assertThat(prestacion.getExam()).isEqualTo("Test exam");
        assertThat(prestacion.getMaxDaysToBeforeInform()).isEqualTo(2);
        assertThat(prestacion.getExamImageId()).isEqualTo("ak123-1231i2u-1k2uy3");
        assertThat(prestacion.getType()).isEqualTo(3);
        assertThat(prestacion.getMedicalRecord()).isNull();
    }

    @Test
    public void testB() {
        ResponseEntity<Prestaciones> prestacionResponse = restTemplate.getForEntity(apiUri + "/1", Prestaciones.class);
        assertThat(prestacionResponse.getStatusCode()).isEqualTo(HttpStatus.OK);
        Prestaciones prestacion = prestacionResponse.getBody();
        assertThat(prestacion.getId()).isEqualTo(1);
        assertThat(prestacion.getPatient()).isEqualTo("Patient Test");
        assertThat(prestacion.getExam()).isEqualTo("Test exam");
        assertThat(prestacion.getMaxDaysToBeforeInform()).isEqualTo(2);
        assertThat(prestacion.getExamImageId()).isEqualTo("ak123-1231i2u-1k2uy3");
        assertThat(prestacion.getType()).isEqualTo(3);
        assertThat(prestacion.getMedicalRecord()).isNull();

        ResponseEntity<List<Prestaciones>> prestacionesResponse = restTemplate.exchange(apiUri,
            HttpMethod.GET, null, new ParameterizedTypeReference<List<Prestaciones>>(){});
        assertThat(prestacionesResponse.getStatusCode()).isEqualTo(HttpStatus.OK);
        List<Prestaciones> prestaciones = prestacionesResponse.getBody();
        assertThat(prestaciones).hasSize(1);
        assertThat(prestaciones.get(0).getId()).isEqualTo(1);
        assertThat(prestaciones.get(0).getPatient()).isEqualTo("Patient Test");
        assertThat(prestaciones.get(0).getExam()).isEqualTo("Test exam");
        assertThat(prestaciones.get(0).getMaxDaysToBeforeInform()).isEqualTo(2);
        assertThat(prestaciones.get(0).getExamImageId()).isEqualTo("ak123-1231i2u-1k2uy3");
        assertThat(prestaciones.get(0).getType()).isEqualTo(3);
        assertThat(prestaciones.get(0).getMedicalRecord()).isNull();
    }

    @Test
    public void testC() {
        HttpEntity<Prestaciones> entity = new HttpEntity<Prestaciones>(new Prestaciones(1, "Patient Test updated", "Test exam updated", new GregorianCalendar(2018, 5, 7).getTime(), 5, new GregorianCalendar(2018, 5, 11).getTime(), "ak123-1231i2u-1k2uy3", 2, null));
        ResponseEntity<Prestaciones> prestacionResponse = restTemplate.exchange(apiUri + "/1",
            HttpMethod.PUT, entity, Prestaciones.class);
        assertThat(prestacionResponse.getStatusCode()).isEqualTo(HttpStatus.OK);
        Prestaciones prestacion = prestacionResponse.getBody();
        assertThat(prestacion.getId()).isEqualTo(1);
        assertThat(prestacion.getPatient()).isEqualTo("Patient Test updated");
        assertThat(prestacion.getExam()).isEqualTo("Test exam updated");
        assertThat(prestacion.getMaxDaysToBeforeInform()).isEqualTo(5);
        assertThat(prestacion.getExamImageId()).isEqualTo("ak123-1231i2u-1k2uy3");
        assertThat(prestacion.getType()).isEqualTo(2);
        assertThat(prestacion.getMedicalRecord()).isNull();
    }

    @Test
    public void testD() {
        restTemplate.delete(apiUri + "/1");
        
        ResponseEntity<List<Prestaciones>> prestacionesResponse = restTemplate.exchange(apiUri,
            HttpMethod.GET, null, new ParameterizedTypeReference<List<Prestaciones>>(){});
        assertThat(prestacionesResponse.getStatusCode()).isEqualTo(HttpStatus.OK);
        List<Prestaciones> prestaciones = prestacionesResponse.getBody();
        assertThat(prestaciones).hasSize(0);
    }
}