import React, { useState } from "react";
import { View, Text, TextInput, Button, FlatList } from "react-native";

// Un array de datos de ejemplo para simular los resultados de la búsqueda
const data = [
  {
    id: 1,
    nroPasaje: "8004536",
    cliente: "BMR",
    estado: "TODO",
    detalles: [
      { id: 1, fecha: "10/01/2023", observacion: "falla en creación" },
    ],
  },
  {
    id: 2,
    nroPasaje: "8004537",
    cliente: "BMR",
    estado: "INPR",
    detalles: [
      { id: 1, fecha: "10/01/2023", observacion: "falla en respaldo" },
    ],
  },
  {
    id: 3,
    nroPasaje: "8004538",
    cliente: "BSE",
    estado: "DONE",
    detalles: [
      { id: 1, fecha: "10/01/2023", observacion: "lleva create table" },
    ],
  },
  {
    id: 4,
    nroPasaje: "8004539",
    cliente: "BSE",
    estado: "TODO",
    detalles: [
      { id: 1, fecha: "10/01/2023", observacion: "tiene los pbds manuales" },
    ],
  },
  {
    id: 5,
    nroPasaje: "8004540",
    cliente: "CMF",
    estado: "TODO",
    detalles: [{ id: 1, fecha: "10/01/2023", observacion: "falla en cración" }],
  },
];

// Un componente que muestra un elemento de la lista de resultados
const Item = ({ item }) => {
  const { nroPasaje, cliente, estado } = item;
  return (
    <View style={{ padding: 10, borderBottomWidth: 1, borderColor: "#ccc" }}>
      <Text style={{ fontSize: 18 }}>{nroPasaje}</Text>
      <Text style={{ fontSize: 18 }}>{cliente}</Text>
      <Text style={{ fontSize: 18 }}>{estado}</Text>
    </View>
  );
};

// Un componente que muestra el formulario de búsqueda y la lista de resultados
const SearchForm = () => {
  // Un estado que almacena el valor del TextInput
  const [query, setQuery] = useState("");

  // Un estado que almacena los resultados de la búsqueda
  const [results, setResults] = useState([]);

  // Una función que se ejecuta al pulsar el botón de buscar
  const handleSearch = () => {
    // Filtrar el array de datos según la coincidencia con la consulta
    let filteredData = data.filter((item) =>
      item.nroPasaje.toLowerCase().includes(query.toLowerCase())
    );

    if (filteredData.length === 0) {
      filteredData = data.filter((item) =>
        item.cliente.toLowerCase().includes(query.toLowerCase())
      );
      if (filteredData.length === 0) {
        filteredData = data.filter((item) =>
          item.estado.toLowerCase().includes(query.toLowerCase())
        );
      }
    }

    // Actualizar el estado de los resultados con los datos filtrados
    setResults(filteredData);
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <View style={{ flexDirection: "row", marginBottom: 20 }}>
        <TextInput
          style={{
            flex: 1,
            borderWidth: 1,
            borderColor: "#ccc",
            padding: 10,
            marginRight: 10,
          }}
          placeholder="Introduce tu búsqueda"
          value={query}
          onChangeText={(text) => setQuery(text)}
        />
        <Button title="Buscar" onPress={handleSearch} />
      </View>
      <FlatList
        data={results}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <Item item={item} />}
      />
    </View>
  );
};

export default SearchForm;
