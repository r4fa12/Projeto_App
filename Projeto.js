import * as React from 'react';
import { TextInput, Text, View, Button, StyleSheet, ScrollView, Animated, TouchableOpacity, ImageBackground} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

class Principal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      usuario: undefined,
      senha: undefined,
      fadeAnim: new Animated.Value(0),  // Valor para a animação de opacidade
      scaleAnim: new Animated.Value(1), // Valor para a animação de pulsação (escala)
    };
  }

  componentDidMount() {
    // Animação para o título aparecer e pulsar
    Animated.sequence([
      Animated.timing(this.state.fadeAnim, {
        toValue: 1,
        duration: 2000, // Duração de 2 segundos para aparecer
        useNativeDriver: true,
      }),
      Animated.sequence([
        Animated.timing(this.state.scaleAnim, {
          toValue: 1.2, // Aumenta o tamanho para 120% do tamanho original
          duration: 500, // Duração da pulsação
          useNativeDriver: true,
        }),
        Animated.timing(this.state.scaleAnim, {
          toValue: 1, // Retorna ao tamanho original
          duration: 500, // Duração da diminuição
          useNativeDriver: true,
        }),
      ])
    ]).start();
  }

  render() {
    return (
      <View style={styles.container}>
        {/* Animação para o título */}
        <Animated.Text 
          style={[
            styles.titulo, 
            { opacity: this.state.fadeAnim, transform: [{ scale: this.state.scaleAnim }] }
          ]}
        >
          GAMEVERSE
        </Animated.Text>

        {/* Campos de entrada de usuário e senha */}
        <Text style={styles.label}>Usuário:</Text>
        <TextInput 
          style={styles.input} 
          onChangeText={(texto) => this.setState({ usuario: texto })} 
        />
        <Text style={styles.label}>Senha:</Text>
        <TextInput 
          style={styles.input} 
          secureTextEntry 
          onChangeText={(texto) => this.setState({ senha: texto })} 
        />

        {/* Botão de login */}
        <TouchableOpacity 
          style={styles.botaologin} 
          onPress={() => this.ler()}
        >
          <View>
            <Text style={styles.botaologintexto}>Logar</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  async ler() {
    try {
      let senha = await AsyncStorage.getItem(this.state.usuario);
      if (senha != null) {
        if (senha === this.state.senha) {
          alert("Logado!!!");
          this.props.navigation.navigate("inicio");
        } else {
          alert("Senha Incorreta!");
        }
      } else {
        alert("Usuário não foi encontrado!");
      }
    } catch (erro) {
      console.log(erro);
    }
  }
}

class Cadastro extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: undefined,
      password: undefined
    };
  }

  async gravar() {
    try {
      await AsyncStorage.setItem(this.state.user, this.state.password);
      alert("Salvo com sucesso!!!");
    } catch (erro) {
      alert("Erro!");
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.label}>Cadastrar Usuário:</Text>
        <TextInput style={styles.input} onChangeText={(texto) => this.setState({ user: texto })} />
        <Text style={styles.label}>Cadastrar Senha:</Text>
        <TextInput style={styles.input} secureTextEntry onChangeText={(texto) => this.setState({ password: texto })} />
        <Button title="Cadastrar" onPress={() => this.gravar()} color="#66bb6a" />
      </View>
    );
  }
}

class App extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen
            name="Login"
            component={Telas}
            options={{
              tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="home-account" color={color} size={size} />,
              headerShown: false
            }}
          />
          <Tab.Screen
            name="Criar Usuário"
            component={Cadastro}
            options={{
              tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="account-details" color={color} size={size} />
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }
}

class Telas extends React.Component {
  render() {
    return (
      <Stack.Navigator>
        <Stack.Screen name= "login" component={Principal} />
        <Stack.Screen name= "inicio" component={Inicio} />
        <Stack.Screen name= "games" component={Games} />
        <Stack.Screen name= "todos" component={Todos} />
        <Stack.Screen name= "infos" component={Infos} />
        <Stack.Screen name= "consoles" component={Consoles} />
        <Stack.Screen name= "Xbox" component={Xbox} />
        <Stack.Screen name= "PlayStation" component={PlayStation} />
        <Stack.Screen name= "Historia" component={Historia} />
        <Stack.Screen name= "Multiplayer" component={Multiplayer} />
        <Stack.Screen name= "Terror" component={Terror} />
        <Stack.Screen name="Forza" component={FORZA} />
        <Stack.Screen name="Gears of War" component={GEARS} /> 
        <Stack.Screen name="Halo" component={HALO} />
        <Stack.Screen name="Microsoft Flight Simulator" component={MFS} />
        <Stack.Screen name="The Last of Us" component={TLOU} />
        <Stack.Screen name="God of War" component={GOW} />
        <Stack.Screen name="Spider-Man" component={SPIDER} />
        <Stack.Screen name="Gran Turismo" component={GT} />
        <Stack.Screen name="Red Dead Redemption" component={RDR} />
        <Stack.Screen name="GTA V" component={GTA} />
        <Stack.Screen name="Detroit Become Human" component={DETROIT} />
        <Stack.Screen name="Cyberpunk 2077" component={CYBERPUNK} />
        <Stack.Screen name="Fortnite" component={FORTNITE} />
        <Stack.Screen name="Call of Duty" component={COD} />
        <Stack.Screen name="Minecraft" component={MINECRAFT} />
        <Stack.Screen name="CSGO" component={CSGO} />
        <Stack.Screen name="Outlast" component={OUTLAST} />
        <Stack.Screen name="Until Dawn" component={UNTILDAWN} />
        <Stack.Screen name="Five Nights at Freddys" component={FNAF} />
        <Stack.Screen name="Resident Evil" component={RESIDENTEVIL} />
      </Stack.Navigator>
    );
  }
}


//opções de consoles e genêros de jogos

const JogoBotao = ({ jogoNome, imagemURL }) => {
  const navigation = useNavigation(); 

  return (
    <View style={styles.botaojogos}>
      <TouchableOpacity onPress={() => navigation.navigate(jogoNome)} style={{ flex: 1 }}>
        <ImageBackground
          source={{ uri: imagemURL }}
          style={styles.imagembotao}
          imageStyle={{ resizeMode: 'cover' }}
        />
      </TouchableOpacity>
    </View>
  );
};

class Todos extends React.Component {
  render() {
    return (
      <ScrollView contentContainerStyle={styles.jogosgeral}>
        <Text style={styles.titulo}>Todos os Jogos disponíveis!</Text>

        <JogoBotao jogoNome="Forza" imagemURL="https://s2-techtudo.glbimg.com/CQxrxGjloT2wySCdeJqsVfTTovY=/0x0:1920x1080/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_08fbf48bc0524877943fe86e43087e7a/internal_photos/bs/2021/9/s/57ypPzTpCNPBRvOcFnng/forza-gamescom-hero-1.jpg" />


        <JogoBotao jogoNome="God of War" imagemURL="https://image.api.playstation.com/vulcan/img/rnd/202010/2217/p3pYq0QxntZQREXRVdAzmn1w.png" navigation={this.props.navigation} />


        <JogoBotao jogoNome="Detroit Become Human" imagemURL="https://upload.wikimedia.org/wikipedia/pt/0/02/Detroit_Become_Human_capa.png" navigation={this.props.navigation} />


        <JogoBotao jogoNome="Minecraft" imagemURL="https://tm.ibxk.com.br/2024/03/13/13144514171257.jpg?ims=1200x675" navigation={this.props.navigation} />


        <JogoBotao jogoNome="CSGO" imagemURL="https://a.espncdn.com/photo/2023/1010/r1236720_1072x603_16-9.png" navigation={this.props.navigation} />


        <JogoBotao jogoNome="Resident Evil" imagemURL="https://assets.nintendo.com/image/upload/c_fill,w_1200/q_auto:best/f_auto/dpr_2.0/ncom/software/switch/70010000012858/f4d4fd20c956621c4a342a8cade2e366f0e3cd43765bb52eccd0fea32b1606ce" navigation={this.props.navigation} />


        <JogoBotao jogoNome="Microsoft Flight Simulator" imagemURL="https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1250410/header.jpg?t=1714143624" />


        <JogoBotao jogoNome="GTA V" imagemURL="https://files.tecnoblog.net/wp-content/uploads/2020/03/gta-v-e1610482062885.jpg" navigation={this.props.navigation} />


        <JogoBotao jogoNome="Halo" imagemURL="https://upload.wikimedia.org/wikipedia/pt/d/d1/Halo_Infinite_capa.png" />


        <JogoBotao jogoNome="Red Dead Redemption" imagemURL="https://image.api.playstation.com/vulcan/img/rnd/202011/1215/WyHa1BM3ISDVqYSEUMB9VZJs.png" navigation={this.props.navigation} />


        <JogoBotao jogoNome="Call of Duty" imagemURL="https://image.api.playstation.com/vulcan/ap/rnd/202306/2400/ac505d57a46e24dd96712263d89a150cb443af288c025ff2.jpg?w=440" navigation={this.props.navigation} />

        <JogoBotao jogoNome="Five Nights at Freddys" imagemURL="https://img.elo7.com.br/product/zoom/261973D/painel-five-nights-at-freddy-s-g-frete-gratis-temas.jpg" navigation={this.props.navigation} />

        <JogoBotao jogoNome="Spider-Man" imagemURL="https://image.api.playstation.com/vulcan/ap/rnd/202011/0402/AcjaXqwZzggGiKLFdEfHMp0H.png" navigation={this.props.navigation} />


        <JogoBotao jogoNome="Outlast" imagemURL="https://cdn1.epicgames.com/offer/78f42129096d4233bccc527733debfbd/EGS_Outlast_RedBarrels_S2_1200x1600-b02ebdfb4bcd3b1d608ab5b87257b3c4" navigation={this.props.navigation} />


        <JogoBotao jogoNome="Cyberpunk 2077" imagemURL="https://cdn1.epicgames.com/offer/77f2b98e2cef40c8a7437518bf420e47/EGS_Cyberpunk2077_CDPROJEKTRED_S2_03_1200x1600-b1847981214ac013383111fc457eb9c5" navigation={this.props.navigation} />

        <JogoBotao jogoNome="Gran Turismo" imagemURL="https://image.api.playstation.com/vulcan/ap/rnd/202109/1321/eFGBuaRr21HUpGtsy3biwJip.png" navigation={this.props.navigation} />

        <JogoBotao jogoNome="Fortnite" imagemURL="https://cdn1.epicgames.com/offer/fn/Blade_2560x1440_2560x1440-95718a8046a942675a0bc4d27560e2bb" navigation={this.props.navigation} />

        <JogoBotao jogoNome="Gears of War" imagemURL="https://store-images.s-microsoft.com/image/apps.6102.13510798887356280.9398b0dd-2ecf-4973-9380-576d1d374a25.92d12017-af9a-41ae-b97a-8213710cdb49?q=90&w=480&h=270" />

        <JogoBotao jogoNome="The Last of Us" imagemURL="https://upload.wikimedia.org/wikipedia/pt/b/be/The_Last_of_Us_capa.png" navigation={this.props.navigation} />

        <JogoBotao jogoNome="Until Dawn" imagemURL="https://image.api.playstation.com/vulcan/ap/rnd/202401/2910/d48262b72a5a2daa3ca3aed6c8f42c44f3fdaf2902265a13.png" navigation={this.props.navigation} />


      </ScrollView>
    );
  }
}

class Consoles extends React.Component {
  render() {
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.titulo}>Jogos disponíveis para Console!</Text>
        <JogoBotao jogoNome="Forza" imagemURL="https://s2-techtudo.glbimg.com/CQxrxGjloT2wySCdeJqsVfTTovY=/0x0:1920x1080/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_08fbf48bc0524877943fe86e43087e7a/internal_photos/bs/2021/9/s/57ypPzTpCNPBRvOcFnng/forza-gamescom-hero-1.jpg" />

        <JogoBotao jogoNome="Gears of War" imagemURL="https://store-images.s-microsoft.com/image/apps.6102.13510798887356280.9398b0dd-2ecf-4973-9380-576d1d374a25.92d12017-af9a-41ae-b97a-8213710cdb49?q=90&w=480&h=270" />

        <JogoBotao jogoNome="Halo" imagemURL="https://upload.wikimedia.org/wikipedia/pt/d/d1/Halo_Infinite_capa.png" />

        <JogoBotao jogoNome="Microsoft Flight Simulator" imagemURL="https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1250410/header.jpg?t=1714143624" />

        <JogoBotao jogoNome="The Last of Us" imagemURL="https://upload.wikimedia.org/wikipedia/pt/b/be/The_Last_of_Us_capa.png" navigation={this.props.navigation} />

        <JogoBotao jogoNome="God of War" imagemURL="https://image.api.playstation.com/vulcan/img/rnd/202010/2217/p3pYq0QxntZQREXRVdAzmn1w.png" navigation={this.props.navigation} />

        <JogoBotao jogoNome="Spider-Man" imagemURL="https://image.api.playstation.com/vulcan/ap/rnd/202011/0402/AcjaXqwZzggGiKLFdEfHMp0H.png" navigation={this.props.navigation} />

        <JogoBotao jogoNome="Gran Turismo" imagemURL="https://image.api.playstation.com/vulcan/ap/rnd/202109/1321/eFGBuaRr21HUpGtsy3biwJip.png" navigation={this.props.navigation} />

      </ScrollView>
    );
  }
}

class Xbox extends React.Component {
  render() {
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.titulo}>Jogos disponíveis para Xbox</Text>
        <JogoBotao jogoNome="Forza" imagemURL="https://s2-techtudo.glbimg.com/CQxrxGjloT2wySCdeJqsVfTTovY=/0x0:1920x1080/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_08fbf48bc0524877943fe86e43087e7a/internal_photos/bs/2021/9/s/57ypPzTpCNPBRvOcFnng/forza-gamescom-hero-1.jpg" />
        <JogoBotao jogoNome="Gears of War" imagemURL="https://store-images.s-microsoft.com/image/apps.6102.13510798887356280.9398b0dd-2ecf-4973-9380-576d1d374a25.92d12017-af9a-41ae-b97a-8213710cdb49?q=90&w=480&h=270" />
        <JogoBotao jogoNome="Halo" imagemURL="https://upload.wikimedia.org/wikipedia/pt/d/d1/Halo_Infinite_capa.png" />
        <JogoBotao jogoNome="Microsoft Flight Simulator" imagemURL="https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1250410/header.jpg?t=1714143624" />
      </ScrollView>
    );
  }
}

class PlayStation extends React.Component {
  render() {
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.titulo}>Jogos disponíveis para PlayStation</Text>
        
        <JogoBotao jogoNome="The Last of Us" imagemURL="https://upload.wikimedia.org/wikipedia/pt/b/be/The_Last_of_Us_capa.png" navigation={this.props.navigation} />
        <JogoBotao jogoNome="God of War" imagemURL="https://image.api.playstation.com/vulcan/img/rnd/202010/2217/p3pYq0QxntZQREXRVdAzmn1w.png" navigation={this.props.navigation} />
        <JogoBotao jogoNome="Spider-Man" imagemURL="https://image.api.playstation.com/vulcan/ap/rnd/202011/0402/AcjaXqwZzggGiKLFdEfHMp0H.png" navigation={this.props.navigation} />
        <JogoBotao jogoNome="Gran Turismo" imagemURL="https://image.api.playstation.com/vulcan/ap/rnd/202109/1321/eFGBuaRr21HUpGtsy3biwJip.png" navigation={this.props.navigation} />
      </ScrollView>
    );
  }
}


class Historia extends React.Component {
  render() {
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.titulo}>Jogos disponíveis deste console</Text>
        
        <JogoBotao jogoNome="Red Dead Redemption" imagemURL="https://image.api.playstation.com/vulcan/img/rnd/202011/1215/WyHa1BM3ISDVqYSEUMB9VZJs.png" navigation={this.props.navigation} />
        <JogoBotao jogoNome="GTA V" imagemURL="https://files.tecnoblog.net/wp-content/uploads/2020/03/gta-v-e1610482062885.jpg" navigation={this.props.navigation} />
        <JogoBotao jogoNome="Detroit Become Human" imagemURL="https://upload.wikimedia.org/wikipedia/pt/0/02/Detroit_Become_Human_capa.png" navigation={this.props.navigation} />
        <JogoBotao jogoNome="Cyberpunk 2077" imagemURL="https://cdn1.epicgames.com/offer/77f2b98e2cef40c8a7437518bf420e47/EGS_Cyberpunk2077_CDPROJEKTRED_S2_03_1200x1600-b1847981214ac013383111fc457eb9c5" navigation={this.props.navigation} />
      </ScrollView>
    );
  }
}

class Multiplayer extends React.Component {
  render() {
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.titulo}>Jogos disponíveis deste console</Text>
        
        <JogoBotao jogoNome="Fortnite" imagemURL="https://cdn1.epicgames.com/offer/fn/Blade_2560x1440_2560x1440-95718a8046a942675a0bc4d27560e2bb" navigation={this.props.navigation} />
        <JogoBotao jogoNome="Call of Duty" imagemURL="https://image.api.playstation.com/vulcan/ap/rnd/202306/2400/ac505d57a46e24dd96712263d89a150cb443af288c025ff2.jpg?w=440" navigation={this.props.navigation} />
        <JogoBotao jogoNome="Minecraft" imagemURL="https://tm.ibxk.com.br/2024/03/13/13144514171257.jpg?ims=1200x675" navigation={this.props.navigation} />
        <JogoBotao jogoNome="CSGO" imagemURL="https://a.espncdn.com/photo/2023/1010/r1236720_1072x603_16-9.png" navigation={this.props.navigation} />
      </ScrollView>
    );
  }
}


class Terror extends React.Component {
  render() {
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.titulo}>Jogos disponíveis deste console</Text>
        
        <JogoBotao jogoNome="Outlast" imagemURL="https://cdn1.epicgames.com/offer/78f42129096d4233bccc527733debfbd/EGS_Outlast_RedBarrels_S2_1200x1600-b02ebdfb4bcd3b1d608ab5b87257b3c4" navigation={this.props.navigation} />
        <JogoBotao jogoNome="Until Dawn" imagemURL="https://image.api.playstation.com/vulcan/ap/rnd/202401/2910/d48262b72a5a2daa3ca3aed6c8f42c44f3fdaf2902265a13.png" navigation={this.props.navigation} />
        <JogoBotao jogoNome="Five Nights at Freddy's" imagemURL="https://img.elo7.com.br/product/zoom/261973D/painel-five-nights-at-freddy-s-g-frete-gratis-temas.jpg" navigation={this.props.navigation} />
        <JogoBotao jogoNome="Resident Evil" imagemURL="https://assets.nintendo.com/image/upload/c_fill,w_1200/q_auto:best/f_auto/dpr_2.0/ncom/software/switch/70010000012858/f4d4fd20c956621c4a342a8cade2e366f0e3cd43765bb52eccd0fea32b1606ce" navigation={this.props.navigation} />
      </ScrollView>
    );
  }
}




//desc dos jogos em ordem

class FORZA extends React.Component {
    render() {
      return (
        <View style={estiloJogos}>
          <Text style={styles.textojogos}> texto X </Text>
        </View>
      );
    }
  }

  class GEARS extends React.Component {
    render() {
      return (
        <View style={estiloJogos}>
          <Text style={styles.textojogos}> texto X </Text>
        </View>
      );
    }
  }

  class HALO extends React.Component {
    render() {
      return (
        <View style={estiloJogos}>
          <Text style={styles.textojogos}> texto X </Text>
        </View>
      );
    }
  }

class MFS extends React.Component {
    render() {
      return (
        <View style={estiloJogos}>
          <Text style={styles.textojogos}>Microsoft Flight Simulator é uma série de simuladores de voo desenvolvida pela Microsoft, que começou em 1982 e se tornou uma das franquias mais icônicas no gênero de simulação. O jogo permite aos jogadores pilotar uma ampla variedade de aeronaves em um mundo digital altamente detalhado, com ênfase na simulação realista da experiência de voo.
  
  A versão mais recente, Microsoft Flight Simulator 2020, lançado para PC e Xbox Series X/S, é a mais avançada da série, com gráficos impressionantes, incluindo a recriação em tempo real do planeta Terra usando imagens e dados de satélite. A física do voo, os sistemas das aeronaves e até as condições meteorológicas são simulados de maneira extremamente realista, oferecendo uma experiência imersiva para entusiastas de aviação e jogadores em geral.
  
  O jogo inclui uma vasta gama de aeronaves, desde pequenos aviões leves até gigantescas aeronaves comerciais, e permite voos em qualquer parte do mundo, com uma recriação fiel de cidades, aeroportos e até fenômenos climáticos. É um dos simuladores de voo mais acessíveis para iniciantes, mas também oferece profundidade suficiente para pilotos e entusiastas da aviação. Além disso, o jogo tem suporte a mods e atualizações frequentes, o que mantém a comunidade ativa.</Text>
        </View>
      );
    }
  }

  class TLOU extends React.Component {
    render() {
      return (
        <View style={estiloJogos}>
          <Text style={styles.textojogos}> texto X </Text>
        </View>
      );
    }
  }

  class GOW extends React.Component {
    render() {
      return (
        <View style={estiloJogos}>
          <Text style={styles.textojogos}> texto X </Text>
        </View>
      );
    }
  }

  class SPIDER extends React.Component {
    render() {
      return (
        <View style={estiloJogos}>
          <Text style={styles.textojogos}> texto X </Text>
        </View>
      );
    }
  }

  class GT extends React.Component {
    render() {
      return (
        <View style={estiloJogos}>
          <Text style={styles.textojogos}> texto X </Text>
        </View>
      );
    }
  }

  class RDR extends React.Component {
    render() {
      return (
        <View style={estiloJogos}>
          <Text style={styles.textojogos}> texto X </Text>
        </View>
      );
    }
  }

  class GTA extends React.Component {
    render() {
      return (
        <View style={estiloJogos}>
          <Text style={styles.textojogos}> texto X </Text>
        </View>
      );
    }
  }

  class DETROIT extends React.Component {
    render() {
      return (
        <View style={estiloJogos}>
          <Text style={styles.textojogos}> texto X </Text>
        </View>
      );
    }
  }

  class CYBERPUNK extends React.Component {
    render() {
      return (
        <View style={estiloJogos}>
          <Text style={styles.textojogos}> texto X </Text>
        </View>
      );
    }
  }

  class FORTNITE extends React.Component {
    render() {
      return (
        <View style={estiloJogos}>
          <Text style={styles.textojogos}> texto X </Text>
        </View>
      );
    }
  }

  class COD extends React.Component {
    render() {
      return (
        <View style={estiloJogos}>
          <Text style={styles.textojogos}> texto X </Text>
        </View>
      );
    }
  }

  class MINECRAFT extends React.Component {
    render() {
      return (
        <View style={estiloJogos}>
          <Text style={styles.textojogos}> texto X </Text>
        </View>
      );
    }
  }

  class CSGO extends React.Component {
    render() {
      return (
        <View style={estiloJogos}>
          <Text style={styles.textojogos}> texto X </Text>
        </View>
      );
    }
  }

  class OUTLAST extends React.Component {
    render() {
      return (
        <View style={estiloJogos}>
          <Text style={styles.textojogos}> texto X </Text>
        </View>
      );
    }
  }

  class UNTILDAWN extends React.Component {
    render() {
      return (
        <View style={estiloJogos}>
          <Text style={styles.textojogos}> texto X </Text>
        </View>
      );
    }
  }

  class FNAF extends React.Component {
    render() {
      return (
        <View style={estiloJogos}>
          <Text style={styles.textojogos}> texto X </Text>
        </View>
      );
    }
  }

  class RESIDENTEVIL extends React.Component {
    render() {
      return (
        <View style={estiloJogos}>
          <Text style={styles.textojogos}> texto X </Text>
        </View>
      );
    }
  }





//opções da tela de inicio do app

class Inicio extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      animations: [
        new Animated.Value(0),
        new Animated.Value(0),
        new Animated.Value(0),
      ],
    };
  }

  componentDidMount() {
    this.animateButtons();
  }

  animateButtons() {
    const { animations } = this.state;
    Animated.stagger(200,
      animations.map((anim) =>
        Animated.timing(anim, {
          toValue: 1,
          duration: 600, 
          useNativeDriver: true,
        })
      )
    ).start();
  }

  render() {
    const { animations } = this.state;

    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.titulo}>Tela de Início</Text>

        {/* Contêiner que envolve os botões */}
        <View style={styles.container}>
          {animations.map((animation, index) => (
            <Animated.View
              style={[
                styles.botaoinicio,
                {
                  opacity: animation,
                  transform: [{ scale: animation }], 
                },
              ]}
              key={index}
            >
              <TouchableOpacity
                style={styles.botoesinicio}
                onPress={() => {
                  if (index === 0) {
                    this.props.navigation.navigate('games');
                  } else if (index === 1) {
                    this.props.navigation.navigate('infos');
                  } else if (index === 2) {
                    this.props.navigation.navigate('login'); 
                  }
                }}
              >
                <Text style={styles.botaoiniciotexto}>
                  {index === 0
                    ? 'Games'
                    : index === 1
                    ? 'Informações'
                    : index === 2
                    ? 'Sair'
                    : ''}
                </Text>
              </TouchableOpacity>
            </Animated.View>
          ))}
        </View>
      </ScrollView>
    );
  }
}



class Games extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      animations: [
        new Animated.Value(0),
        new Animated.Value(0),
        new Animated.Value(0),
      ],
    };
  }

  componentDidMount() {
    this.animateButtons();
  }

  animateButtons() {
    const { animations } = this.state;
    Animated.stagger(200,
      animations.map((anim) =>
        Animated.timing(anim, {
          toValue: 1,
          duration: 600, 
          useNativeDriver: true,
        })
      )
    ).start();
  }

  render() {
    const { animations } = this.state;

    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.titulo}>Filtragem</Text>

        <View style={styles.container}>
          {animations.map((animation, index) => (
            <Animated.View
              style={[
                styles.botaoinicio,
                {
                  opacity: animation,
                  transform: [{ scale: animation }], 
                },
              ]}
              key={index}
            >
              <TouchableOpacity
                style={styles.botoesinicio}
                onPress={() => {
                  if (index === 0) {
                    this.props.navigation.navigate('todos');
                  } else if (index === 1) {
                    this.props.navigation.navigate('consoles');
                  } else if (index === 2) {
                    this.props.navigation.navigate('filterOption3');
                  }
                }}
              >
                <Text style={styles.botaoiniciotexto}>
                  {index === 0
                    ? 'Todos os Jogos'
                    : index === 1
                    ? 'Consoles'
                    : index === 2
                    ? 'Gêneros'
                    : ''}
                </Text>
              </TouchableOpacity>
            </Animated.View>
          ))}
        </View>
      </ScrollView>
    );
  }
}


class Infos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      textOpacity: new Animated.Value(0), 
      currentText: '',
    };
  }

  componentDidMount() {
    const fullText = "Descubra o jogo perfeito para você no GameVerse! Somos um catálogo completo que facilita a busca de jogos disponíveis por plataforma e gênero, trazendo informações organizadas para que você encontre exatamente o que procura. Navegue por nosso site e explore uma grande variedade de títulos, desde lançamentos até clássicos!";
    
    let index = 0;

    // Função para digitar o texto aos poucos
    const typeText = () => {
      if (index < fullText.length) {
        this.setState(
          prevState => ({
            currentText: prevState.currentText + fullText[index],
          }),
          () => {
            index++;
            setTimeout(typeText, 40); 
          }
        );
      }
    };

    Animated.timing(this.state.textOpacity, {
      toValue: 1,
      duration: 300, 
      useNativeDriver: true,
    }).start();

    typeText(); 
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <Animated.Text style={[styles.textoinfo, { opacity: this.state.textOpacity }]}>
          {this.state.currentText}
        </Animated.Text>
      </ScrollView>
    );
  }
}


const estiloJogos = {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  padding: 20
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#666666',
    flexGrow: 1,
    paddingTop: 15,
  },
  titulo: {
    justifyContent: 'center',
    textAlign: 'center',
    fontSize: 40,
    fontWeight: 'bold',
    color: '#1976D2', 
    marginBottom: 24,
    letterSpacing: 2, 
    textShadowColor: '#000',
    textShadowOffset: { width: 2, height: 2 }, 
  },
  label: {
    fontSize: 20,
    fontWeight: '500',
    color: '#1e1e1e', 
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  input: {
    width: '85%',
    padding: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#555',
    borderRadius: 8,
    color: '#ffffff', 
    backgroundColor: '#444444', 
  },
  botaologin: {
    marginTop: 16,
    width: '85%',
    borderRadius: 8,
    overflow: 'hidden',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 14,
    backgroundColor: '#1976D2',
    
  },
  botaologintexto: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
  textojogos: {
    flex: 1,
    justifyContent: 'center',
    fontSize: 20,
    textAlign: 'center'
  },
  botaojogos: {
    width: '100%', 
    height: 200,
    borderRadius: 10,
    marginVertical: 8,
    borderWidth: 4,
    borderColor: '#ccc',
    overflow: 'hidden',
    flex: 1,
    aspectRatio: 16 / 9,
  },
  botaoinicio: {
    width: '150%', 
    marginVertical: 10,
    opacity: 0,
  },
  imagembotao: {
    flex: 1,
    borderRadius: 8,
  },
  botoesinicio: {
    backgroundColor: '#1976D2', 
    paddingVertical: 16,
    borderRadius: 12, 
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 6, 
    transform: [{ scale: 0.95 }], 
    transition: 'transform 0.3s', 
    flex: 1,
    justifyContent: 'center',
    
  },
  botaoiniciotexto: {
    color: '#ffffff',
    fontSize: 20, 
    fontWeight: '600',
  },
  textoinfo: {
    fontSize: 18,
    color: '#000000',            
    lineHeight: 24,
    textAlign: 'justify',         
    fontFamily: 'Courier New',   
    padding: 10,      
  },
  jogosgeral: {
    flexGrow: 1, 
    paddingBottom: 20,
  },
});


export default App;
