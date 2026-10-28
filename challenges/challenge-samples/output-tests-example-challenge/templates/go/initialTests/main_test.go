package main

import "testing"

func TestHelloWorld(t *testing.T) {
	t.Run("prints Hello World", func(t *testing.T) {
		if got := DojoRun(t, ""); got != "Hello World" {
			t.Errorf("expected %q, got %q", "Hello World", got)
		}
	})
}
