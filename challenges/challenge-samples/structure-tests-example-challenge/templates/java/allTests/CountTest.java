package challenge;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

public class CountTest {
    @Test
    @DisplayName("prints 1 to 5")
    void printsOneToFive() {
        assertEquals("1\n2\n3\n4\n5", DojoIO.run());
    }

    @Test
    @DisplayName("uses a for loop")
    void usesAForLoop() {
        assertTrue(DojoIO.uses("for"));
    }

    @Test
    @DisplayName("does not use while")
    void doesNotUseWhile() {
        assertFalse(DojoIO.uses("while"));
    }

    @Test
    @DisplayName("has one if inside the loop")
    void hasOneIfInsideTheLoop() {
        assertEquals(1, DojoIO.count("if@for", "main"));
    }

    @Test
    @DisplayName("calls System.out.println")
    void callsPrintln() {
        assertTrue(DojoIO.calls("System.out.println"));
    }

    @Test
    @DisplayName("keeps a running total in a variable")
    void keepsARunningTotalInAVariable() {
        assertTrue(DojoIO.uses("value:0"));
        assertTrue(DojoIO.count("update@for") >= 2);
    }
}
