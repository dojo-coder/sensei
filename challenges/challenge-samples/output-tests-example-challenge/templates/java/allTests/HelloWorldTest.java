package challenge;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

public class HelloWorldTest {
    @Test
    @DisplayName("prints Hello World")
    void printsHelloWorld() {
        assertEquals("Hello World", DojoIO.run());
    }
}
