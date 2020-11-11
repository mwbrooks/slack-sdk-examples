import com.slack.api.Slack;
import com.slack.api.SlackConfig;
import com.slack.api.methods.response.api.ApiTestResponse;
import com.slack.api.util.http.SlackHttpClient;
import java.util.concurrent.TimeUnit;
import okhttp3.OkHttpClient;

public class Example {
  public static void main(String[] args) throws Exception {
    // Create a custom OkHttpClient with no timeout on read, write, or call:
    // @see https://square.github.io/okhttp/4.x/okhttp/okhttp3/-ok-http-client/-builder/read-timeout/
    // @see https://square.github.io/okhttp/4.x/okhttp/okhttp3/-ok-http-client/-builder/write-timeout/
    // @see https://square.github.io/okhttp/4.x/okhttp/okhttp3/-ok-http-client/-builder/call-timeout/
    OkHttpClient okHttpClient = new OkHttpClient.Builder()
      .readTimeout(0, TimeUnit.MILLISECONDS)
      .writeTimeout(0, TimeUnit.MILLISECONDS)
      .callTimeout(0, TimeUnit.SECONDS)
      .build();

    // Create a Slack instance using the custom OkHttpClient
    SlackHttpClient slackHttpClient = new SlackHttpClient(okHttpClient);
    Slack slack = Slack.getInstance(SlackConfig.DEFAULT, slackHttpClient);

    ApiTestResponse response = slack.methods().apiTest(r -> r.foo("bar"));
    System.out.println(response);
  }
}