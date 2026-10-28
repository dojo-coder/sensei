package challenge;

public class Main {
    public static void main(String[] args) {
        int total = 0;
        for (int i = 1; i <= 5; i++) {
            if (i % 2 == 0) {
                total += i;
            }
            System.out.println(i);
        }
    }
}
