package main

import "testing"

func TestCount(t *testing.T) {
	t.Run("prints 1 to 5", func(t *testing.T) {
		if got := DojoRun(t, ""); got != "1\n2\n3\n4\n5" {
			t.Errorf("expected 1..5, got %q", got)
		}
	})
	t.Run("uses a for loop", func(t *testing.T) {
		if !DojoUses(t, "for") {
			t.Error("use a for loop to count")
		}
	})
	t.Run("does not use while", func(t *testing.T) {
		if DojoUses(t, "while") {
			t.Error("count with a classic for loop, not a condition-only loop")
		}
	})
	t.Run("has one if inside the loop", func(t *testing.T) {
		if got := DojoCount(t, "if@for", "main"); got != 1 {
			t.Errorf("expected one if inside the loop, got %d", got)
		}
	})
	t.Run("calls fmt.Println", func(t *testing.T) {
		if !DojoCalls(t, "fmt.Println") {
			t.Error("print with fmt.Println")
		}
	})
	t.Run("declares and updates total", func(t *testing.T) {
		if !DojoDeclares(t, "total") || !DojoUses(t, "update:total@for") {
			t.Error("keep a total that the loop updates")
		}
	})
}
