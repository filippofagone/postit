package it.ebeautygroup.postit;

import android.os.Bundle;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        // le scritte restano alla dimensione disegnata dall'app,
        // ignorando l'ingrandimento testo di sistema (che le faceva uscire dai post-it)
        this.bridge.getWebView().getSettings().setTextZoom(100);
    }
}
